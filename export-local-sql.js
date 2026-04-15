const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function exportSql() {
  console.log('🔍 正在从本地 Docker MySQL 读取数据...');
  
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'pilastuser',
    password: process.env.MYSQL_PASSWORD || 'pilastpassword',
    database: process.env.MYSQL_DATABASE || 'pilast',
  });

  const tables = ['categories', 'settings', 'media', 'products'];
  let sqlDump = `-- Pilast Database Dump
SET FOREIGN_KEY_CHECKS = 0;

`;

  try {
    for (const table of tables) {
      console.log(`📡 导出表: ${table}...`);
      
      // 1. 获取建表语句 (针对 MySQL 5.7 适配)
      const [showCreate] = await pool.query(`SHOW CREATE TABLE ${table}`);
      let createSql = showCreate[0]['Create Table'];
      sqlDump += `DROP TABLE IF EXISTS \`${table}\`;\n${createSql};\n\n`;

      // 2. 获取数据
      const [rows] = await pool.query(`SELECT * FROM ${table}`);
      if (rows.length > 0) {
        const keys = Object.keys(rows[0]);
        const escapedKeys = keys.map(k => `\`${k}\``).join(', ');
        
        sqlDump += `INSERT INTO \`${table}\` (${escapedKeys}) VALUES \n`;
        
        const valueStrings = rows.map(row => {
          const vals = keys.map(k => {
            const val = row[k];
            if (val === null) return 'NULL';
            if (typeof val === 'string') return `'${val.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
            if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
            return val;
          });
          return `(${vals.join(', ')})`;
        });

        sqlDump += valueStrings.join(',\n') + ';\n\n';
      }
    }

    sqlDump += 'SET FOREIGN_KEY_CHECKS = 1;';
    
    fs.writeFileSync('db_dump.sql', sqlDump);
    console.log('✅ 导出成功！文件已保存为: db_dump.sql');
    console.log('👉 现在你可以打开线上的 phpMyAdmin，选择数据库，点击“导入”，然后上传这个 db_dump.sql 即可。');

  } catch (err) {
    console.error('❌ 导出失败:', err);
  } finally {
    await pool.end();
  }
}

exportSql();
