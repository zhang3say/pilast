import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'pilates.db');

// Initialize database
const db = new Database(dbPath, { verbose: console.log });

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    overview TEXT,
    features TEXT,
    parameters TEXT,
    image_url TEXT,
    images TEXT DEFAULT '[]',
    details_html TEXT,
    seo_keywords TEXT,
    seo_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT,
    size INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    country TEXT,
    product_interested TEXT,
    quantity TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    remarks TEXT
  );
`);

// Seed initial categories if empty
const countCategories = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
if (countCategories.count === 0) {
  // Try to get categories from existing products if any
  const existingProductCategories = db.prepare('SELECT DISTINCT category FROM products').all() as { category: string }[];
  const insertCategory = db.prepare('INSERT INTO categories (name) VALUES (?)');
  
  if (existingProductCategories.length > 0) {
    existingProductCategories.forEach(row => {
      try { insertCategory.run(row.category); } catch (e) {}
    });
  } else {
    // Default categories if nothing exists
    ['Pilates Reformers', 'Cadillac Pilates Beds', 'Pilates Chairs', 'Ladder Barrels'].forEach(name => {
      insertCategory.run(name);
    });
  }
}

// Seed initial settings if empty
const countSettings = db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number };
if (countSettings.count === 0) {
  const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  insertSetting.run('phone', '+86 123 4567 8900');
  insertSetting.run('whatsapp', '+86 123 4567 8900');
  insertSetting.run('email', 'sales@pilates-exporter.com');
  insertSetting.run('address', '123 Fitness Equipment Park, Guangzhou, China');
}

// Seed initial products if empty
const countProducts = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (countProducts.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (name, slug, category, overview, features, parameters, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  insertProduct.run(
    'Commercial Pilates Reformer Machine',
    'commercial-pilates-reformer',
    'Pilates Reformers',
    'High-quality commercial pilates reformer designed for professional fitness studios and rehabilitation centers. Made of thickened steel frame, wear-resistant PU leather, high-elastic springs, providing smooth and comfortable training experience. Suitable for full-body training, core strengthening, rehabilitation exercise and private coaching.',
    '1. Sturdy and durable frame, strong load-bearing capacity, long service life.\n2. Ergonomic design, comfortable padding, reduce body pressure during training.\n3. Adjustable spring tension, suitable for trainers of different levels.\n4. Smooth sliding carriage, quiet and stable operation.\n5. Easy to install and maintain, suitable for long-term commercial use.\n6. Customizable color and logo to meet brand needs.',
    'Model No.: PR-100\nMaterial: Wooden Frame, High-Density Sponge, PU Leather, Stainless Steel Springs\nProduct Size: 240 × 70 × 35 cm\nNet Weight: 85 kg\nLoad Capacity: 150 kg\nSpring Tension: Adjustable (5 Springs)\nColor Options: Black, Grey, Beige, Custom\nMOQ: 1 Set\nLead Time: Sample (3-7 Days), Bulk Order (15-30 Days)\nCertifications: CE, ISO9001',
    'https://picsum.photos/seed/reformer1/800/600'
  );

  insertProduct.run(
    'Full-Size Cadillac Bed',
    'full-size-cadillac-bed',
    'Cadillac Pilates Beds',
    'Ideal for high-end pilates studios and rehabilitation centers, supports multi-directional training, spine correction and full-body conditioning. Durable materials, ergonomic design.',
    '1. Stainless steel tower frame, rust-proof and durable.\n2. Multiple attachment points for springs and straps.\n3. High-density EVA foam padding.\n4. Includes push-through bar, roll-down bar, and trapeze.',
    'Model No.: CB-200\nMaterial: Stainless Steel, Maple Wood, PU Leather\nProduct Size: 220 × 80 × 210 cm\nNet Weight: 120 kg\nLoad Capacity: 200 kg\nColor Options: Custom\nMOQ: 1 Set',
    'https://picsum.photos/seed/cadillac1/800/600'
  );

  insertProduct.run(
    'Stability Chair',
    'stability-chair',
    'Pilates Chairs',
    'Compact and versatile, perfect for small-space studios and home use, targets core strength, balance and muscle shaping. Easy to operate, space-saving.',
    '1. Split pedal design for unilateral or bilateral exercises.\n2. Adjustable spring resistance.\n3. Compact footprint.\n4. Sturdy wooden construction.',
    'Model No.: SC-300\nMaterial: Maple Wood, Steel Springs, PU Leather\nProduct Size: 80 × 60 × 65 cm\nNet Weight: 35 kg\nLoad Capacity: 120 kg\nColor Options: Custom\nMOQ: 1 Set',
    'https://picsum.photos/seed/chair1/800/600'
  );
}

export default db;
