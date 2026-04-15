'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const adminEmail = process.env.ADMIN_EMAIL || 'Pilast@admin.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'PilastAdmin2026!';

function getAdminCookieOptions() {
  const sameSiteEnv = process.env.ADMIN_COOKIE_SAME_SITE?.toLowerCase();
  const sameSite = sameSiteEnv === 'none' ? 'none' : sameSiteEnv === 'strict' ? 'strict' : 'lax';
  const secure = process.env.ADMIN_COOKIE_SECURE === 'true' || sameSite === 'none';

  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  } as const;
}

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', getAdminCookieOptions());
    return { success: true };
  }
  
  return { success: false, error: 'Invalid email or password' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  redirect('/admin/login');
}
