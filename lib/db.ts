import mysql from 'mysql2/promise';

const connectionConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'pilastuser',
  password: process.env.MYSQL_PASSWORD || 'pilastpassword',
  database: process.env.MYSQL_DATABASE || 'pilast',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
};

async function withConnection<T>(run: (connection: any) => Promise<T>): Promise<T> {
  const connection = await mysql.createConnection(connectionConfig);
  try {
    return await run(connection);
  } finally {
    await connection.end();
  }
}

// Adapter to perfectly mimic better-sqlite3 standard queries asynchronously
const db = {
  exec: async (sql: string) => withConnection(async (connection) => {
    const statements = sql.split(';').filter((s: string) => s.trim().length > 0);
    for (const s of statements) {
      await connection.query(s);
    }
  }),
  prepare: (sql: string) => {
    return {
      run: async (...params: any[]) =>
        withConnection(async (connection) => {
          const [result] = await connection.query(sql, params) as any;
          return { lastInsertRowid: result.insertId, changes: result.affectedRows };
        }),
      get: async (...params: any[]) =>
        withConnection(async (connection) => {
          const [rows] = await connection.query(sql, params) as any[];
          return Array.isArray(rows) ? rows[0] : undefined;
        }),
      all: async (...params: any[]) =>
        withConnection(async (connection) => {
          const [rows] = await connection.query(sql, params) as any[];
          return Array.isArray(rows) ? rows : [];
        })
    };
  }
};

export async function initializeDb() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      category TEXT NOT NULL,
      overview TEXT,
      features TEXT,
      parameters TEXT,
      image_url TEXT,
      images TEXT,
      details_html TEXT,
      seo_keywords TEXT,
      seo_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      filename VARCHAR(255) NOT NULL,
      url VARCHAR(500) NOT NULL,
      type VARCHAR(100),
      size INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      country VARCHAR(255),
      product_interested VARCHAR(255),
      quantity VARCHAR(100),
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) PRIMARY KEY,
      value TEXT
    );
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) UNIQUE NOT NULL,
      remarks TEXT
    );
  `);
  
  // Try counting existing Settings
  const countSettingsList = await db.prepare('SELECT COUNT(*) as count FROM settings').all();
  if (countSettingsList[0].count === 0) {
    const insertSetting = db.prepare('INSERT INTO settings (\`key\`, value) VALUES (?, ?)');
    await insertSetting.run('phone', '+86 123 4567 8900');
    await insertSetting.run('whatsapp', '+86 123 4567 8900');
    await insertSetting.run('email', 'sales@pilates-exporter.com');
    await insertSetting.run('address', '123 Fitness Equipment Park, Guangzhou, China');
  }

  // Categories
  const countCatList = await db.prepare('SELECT COUNT(*) as count FROM categories').all();
  if (countCatList[0].count === 0) {
    const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');
    for (const name of ['Pilates Reformers', 'Cadillac Pilates Beds', 'Pilates Chairs', 'Ladder Barrels']) {
      await insertCategory.run(name);
    }
  }

  // Initial Product Demo
  const countProdList = await db.prepare('SELECT COUNT(*) as count FROM products').all();
  if (countProdList[0].count === 0) {
    const insertProduct = db.prepare(`
      INSERT INTO products (name, slug, category, overview, features, parameters, image_url, images, details_html, seo_keywords, seo_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    await insertProduct.run(
      'Commercial Pilates Reformer Machine',
      'commercial-pilates-reformer',
      'Pilates Reformers',
      'High-quality commercial.',
      '1. Sturdy frame',
      'Model No.: PR-100',
      'https://picsum.photos/seed/reformer1/800/600',
      '[]',
      '',
      '',
      ''
    );
  }
}

// Call dynamically, but avoid multiple triggers
let initPromise: Promise<void> | null = null;
if (!initPromise) {
  initPromise = initializeDb().catch(console.error);
}

export default db;
