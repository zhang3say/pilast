import mysql from 'mysql2/promise';
import type { Pool, PoolConnection } from 'mysql2/promise';

const connectionConfig = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'pilastuser',
  password: process.env.MYSQL_PASSWORD || 'pilastpassword',
  database: process.env.MYSQL_DATABASE || 'pilast',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
};

function readPositiveInt(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function isNextBuildProcess() {
  const argv = process.argv.join(' ');
  return process.env.npm_lifecycle_event === 'build' || argv.includes('next') && argv.includes('build');
}

const shouldUsePool = process.env.MYSQL_DISABLE_POOL === 'true'
  ? false
  : !isNextBuildProcess();

const connectionLimit = readPositiveInt(process.env.MYSQL_CONNECTION_LIMIT, 5);
const maxIdle = readPositiveInt(process.env.MYSQL_MAX_IDLE, connectionLimit);
const idleTimeout = readPositiveInt(process.env.MYSQL_IDLE_TIMEOUT, 60000);

let pool: Pool | null = null;
let initPromise: Promise<void> | null = null;

function getPool() {
  if (!shouldUsePool) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      ...connectionConfig,
      waitForConnections: true,
      connectionLimit,
      maxIdle,
      idleTimeout,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  return pool;
}

async function withShortConnection<T>(run: (connection: PoolConnection) => Promise<T>): Promise<T> {
  const connection = await mysql.createConnection(connectionConfig) as PoolConnection;
  try {
    return await run(connection);
  } finally {
    await connection.end();
  }
}

async function withDbConnection<T>(run: (connection: PoolConnection) => Promise<T>): Promise<T> {
  const activePool = getPool();

  if (!activePool) {
    return withShortConnection(run);
  }

  const connection = await activePool.getConnection();
  try {
    return await run(connection);
  } finally {
    connection.release();
  }
}

async function execRaw(sql: string) {
  await withDbConnection(async (connection) => {
    const statements = sql.split(';').filter((statement) => statement.trim().length > 0);
    for (const statement of statements) {
      await connection.query(statement);
    }
  });
}

async function runRaw(sql: string, params: any[]) {
  return withDbConnection(async (connection) => {
    const [result] = await connection.query(sql, params) as any;
    return {
      lastInsertRowid: result.insertId,
      changes: result.affectedRows,
    };
  });
}

async function getRaw<T>(sql: string, params: any[]) {
  return withDbConnection(async (connection) => {
    const [rows] = await connection.query(sql, params) as any[];
    return Array.isArray(rows) ? rows[0] as T | undefined : undefined;
  });
}

async function allRaw<T>(sql: string, params: any[]) {
  return withDbConnection(async (connection) => {
    const [rows] = await connection.query(sql, params) as any[];
    return Array.isArray(rows) ? rows as T[] : [];
  });
}

async function ensureColumnExists(tableName: string, columnName: string, definition: string) {
  const existingColumn = await getRaw<{ count: number }>(`
    SELECT COUNT(*) AS count
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = ?
      AND COLUMN_NAME = ?
  `, [tableName, columnName]);

  if (!existingColumn || existingColumn.count === 0) {
    try {
      await execRaw(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
    } catch (error: any) {
      if (error?.code !== 'ER_DUP_FIELDNAME') {
        throw error;
      }
    }
  }
}

export async function initializeDb() {
  await execRaw(`
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
      is_hot TINYINT(1) NOT NULL DEFAULT 0,
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

  await ensureColumnExists('products', 'is_hot', 'TINYINT(1) NOT NULL DEFAULT 0');

  const settingsCount = await allRaw<{ count: number }>('SELECT COUNT(*) as count FROM settings', []);
  if (settingsCount[0]?.count === 0) {
    await runRaw('INSERT INTO settings (`key`, value) VALUES (?, ?)', ['phone', '+86 123 4567 8900']);
    await runRaw('INSERT INTO settings (`key`, value) VALUES (?, ?)', ['whatsapp', '+86 123 4567 8900']);
    await runRaw('INSERT INTO settings (`key`, value) VALUES (?, ?)', ['email', 'sales@pilates-exporter.com']);
    await runRaw('INSERT INTO settings (`key`, value) VALUES (?, ?)', ['address', '123 Fitness Equipment Park, Guangzhou, China']);
  }

  const categoriesCount = await allRaw<{ count: number }>('SELECT COUNT(*) as count FROM categories', []);
  if (categoriesCount[0]?.count === 0) {
    for (const name of ['Pilates Reformers', 'Cadillac Pilates Beds', 'Pilates Chairs', 'Ladder Barrels']) {
      await runRaw('INSERT INTO categories (name) VALUES (?)', [name]);
    }
  }

  const productsCount = await allRaw<{ count: number }>('SELECT COUNT(*) as count FROM products', []);
  if (productsCount[0]?.count === 0) {
    await runRaw(`
      INSERT INTO products (name, slug, category, overview, features, parameters, image_url, images, details_html, seo_keywords, seo_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
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
      '',
    ]);
  }
}

async function ensureInitialized() {
  if (!initPromise) {
    initPromise = initializeDb().catch((error) => {
      initPromise = null;
      throw error;
    });
  }

  return initPromise;
}

const db = {
  exec: async (sql: string) => {
    await ensureInitialized();
    return execRaw(sql);
  },
  prepare: (sql: string) => {
    return {
      run: async (...params: any[]) => {
        await ensureInitialized();
        return runRaw(sql, params);
      },
      get: async (...params: any[]) => {
        await ensureInitialized();
        return getRaw(sql, params);
      },
      all: async (...params: any[]) => {
        await ensureInitialized();
        return allRaw(sql, params);
      },
    };
  },
};

export default db;
