'use server';

import db from './db';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';

export async function getProducts() {
  const stmt = db.prepare('SELECT * FROM products ORDER BY created_at DESC');
  return await stmt.all() as any[];
}

export async function getHotProducts() {
  const stmt = db.prepare('SELECT * FROM products WHERE is_hot = 1 ORDER BY created_at DESC');
  return await stmt.all() as any[];
}

export async function getProductBySlug(slug: string) {
  const stmt = db.prepare('SELECT * FROM products WHERE slug = ?');
  return await stmt.get(slug) as any;
}

export async function getProductById(id: number) {
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  return await stmt.get(id) as any;
}

export async function createProduct(data: any) {
  const stmt = db.prepare(`
    INSERT INTO products (name, slug, category, overview, features, parameters, image_url, images, details_html, seo_keywords, seo_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = await stmt.run(
    data.name,
    data.slug,
    data.category,
    data.overview,
    data.features,
    data.parameters,
    data.image_url || '',
    data.images || '[]',
    data.details_html || '',
    data.seo_keywords || '',
    data.seo_description || ''
  );
  revalidatePath('/admin/products');
  revalidatePath('/products');
  return info.lastInsertRowid;
}

export async function updateProduct(id: number, data: any) {
  const stmt = db.prepare(`
    UPDATE products
    SET name = ?, slug = ?, category = ?, overview = ?, features = ?, parameters = ?, image_url = ?, images = ?, details_html = ?, seo_keywords = ?, seo_description = ?
    WHERE id = ?
  `);
  await stmt.run(
    data.name,
    data.slug,
    data.category,
    data.overview,
    data.features,
    data.parameters,
    data.image_url || '',
    data.images || '[]',
    data.details_html || '',
    data.seo_keywords || '',
    data.seo_description || '',
    id
  );
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath(`/products/${data.slug}`);
}

export async function getMedia() {
  const stmt = db.prepare('SELECT * FROM media ORDER BY created_at DESC');
  return await stmt.all() as any[];
}

export async function uploadMedia(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file) return { success: false, error: 'No file' };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  const url = `/uploads/${filename}`;
  const stmt = db.prepare('INSERT INTO media (filename, url, type, size) VALUES (?, ?, ?, ?)');
  await stmt.run(filename, url, file.type, file.size);

  revalidatePath('/admin/media');
  return { success: true, url };
}

export async function deleteMedia(id: number, url: string) {
  // Delete from DB
  const stmt = db.prepare('DELETE FROM media WHERE id = ?');
  await stmt.run(id);

  // Delete from FS
  try {
    const filepath = join(process.cwd(), 'public', url);
    if (existsSync(filepath)) {
      const { unlink } = require('fs/promises');
      await unlink(filepath);
    }
  } catch (e) {
    console.error('Failed to delete file from FS:', e);
  }

  revalidatePath('/admin/media');
}

export async function deleteProduct(id: number) {
  const stmt = db.prepare('DELETE FROM products WHERE id = ?');
  await stmt.run(id);
  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath('/');
}

export async function updateProductHotStatus(id: number, isHot: boolean) {
  const stmt = db.prepare('UPDATE products SET is_hot = ? WHERE id = ?');
  await stmt.run(isHot ? 1 : 0, id);
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function submitInquiry(data: any) {
  const stmt = db.prepare(`
    INSERT INTO inquiries (name, company, email, country, product_interested, quantity, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  await stmt.run(
    data.name,
    data.company || '',
    data.email,
    data.country || '',
    data.product_interested || '',
    data.quantity || '',
    data.message || ''
  );
  revalidatePath('/admin/inquiries');
}

export async function getInquiries() {
  const stmt = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC');
  return await stmt.all() as any[];
}

export async function getSettings() {
  noStore();
  const stmt = db.prepare('SELECT * FROM settings');
  const rows = await stmt.all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  rows.forEach(row => {
    settings[row.key] = row.value;
  });
  return settings;
}

export async function updateSettings(data: Record<string, string>) {
  const stmt = db.prepare('UPDATE settings SET value = ? WHERE `key` = ?');
  const insertStmt = db.prepare('REPLACE INTO settings (`key`, value) VALUES (?, ?)');
  
  for (const [key, value] of Object.entries(data)) {
    await insertStmt.run(key, value);
  }
  
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout');
}

export async function updateSettingsWithLogo(formData: FormData) {
  const data: Record<string, string> = {
    site_name: formData.get('site_name') as string,
    phone: formData.get('phone') as string,
    whatsapp: formData.get('whatsapp') as string,
    email: formData.get('email') as string,
    address: formData.get('address') as string,
    seo_base_url: formData.get('seo_base_url') as string,
    seo_title_suffix: formData.get('seo_title_suffix') as string,
    seo_keywords: formData.get('seo_keywords') as string,
    seo_description: formData.get('seo_description') as string,
  };

  const logoFile = formData.get('site_logo_file') as File | null;
  if (logoFile && logoFile.size > 0) {
    const bytes = await logoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const ext = logoFile.name.split('.').pop() || 'png';
    const filename = `logo-${Date.now()}.${ext}`;
    const filepath = join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    data.site_logo = `/uploads/${filename}`;
  }

  const insertStmt = db.prepare('REPLACE INTO settings (`key`, value) VALUES (?, ?)');
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      await insertStmt.run(key, value);
    }
  }
  
  revalidatePath('/admin/settings');
  revalidatePath('/', 'layout');
  revalidatePath('/');
  revalidatePath('/robots.txt');
  revalidatePath('/sitemap.xml');
}

export async function getCategories() {
  const stmt = db.prepare('SELECT name FROM categories ORDER BY name ASC');
  const rows = await stmt.all() as { name: string }[];
  return rows.map(r => r.name);
}

export async function getAllCategories() {
  const stmt = db.prepare('SELECT * FROM categories ORDER BY name ASC');
  return await stmt.all() as { id: number; name: string }[];
}

export async function createCategory(name: string, remarks: string = '') {
  const stmt = db.prepare('INSERT INTO categories (name, remarks) VALUES (?, ?)');
  try {
    await stmt.run(name, remarks);
    revalidatePath('/admin/categories');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: number) {
  const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
  await stmt.run(id);
  revalidatePath('/admin/categories');
  revalidatePath('/products');
}

export async function updateCategory(id: number, name: string, remarks: string = '') {
  const stmt = db.prepare('UPDATE categories SET name = ?, remarks = ? WHERE id = ?');
  try {
    await stmt.run(name, remarks, id);
    revalidatePath('/admin/categories');
    revalidatePath('/products');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCategoryById(id: number) {
  const stmt = db.prepare('SELECT * FROM categories WHERE id = ?');
  return await stmt.get(id) as { id: number; name: string; remarks: string };
}

export async function getPaginatedProducts({
  page = 1,
  limit = 9,
  search = '',
  category = ''
}: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) {
  const offset = (page - 1) * limit;
  let queryStr = 'SELECT * FROM products WHERE 1=1';
  let countQueryStr = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
  const params: any[] = [];

  if (search) {
    queryStr += ' AND (name LIKE ? OR overview LIKE ?)';
    countQueryStr += ' AND (name LIKE ? OR overview LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (category) {
    queryStr += ' AND category = ?';
    countQueryStr += ' AND category = ?';
    params.push(category);
  }

  queryStr += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  
  const products = await db.prepare(queryStr).all(...params, limit, offset) as any[];
  const countResult = await db.prepare(countQueryStr).get(...params) as { total: number } | undefined;
  const total = countResult?.total || 0;
  
  return {
    products,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    totalItems: total
  };
}
