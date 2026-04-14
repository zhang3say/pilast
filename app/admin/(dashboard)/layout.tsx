import Link from 'next/link';
import { logout } from '@/lib/auth';

export const metadata = {
  title: '管理后台 | Pilast',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Pilast 管理后台</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-gray-800">仪表盘</Link>
          <Link href="/admin/products" className="block px-4 py-2 rounded hover:bg-gray-800">产品管理</Link>
          <Link href="/admin/inquiries" className="block px-4 py-2 rounded hover:bg-gray-800">询盘记录</Link>
          <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-gray-800">网站设置</Link>
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-800 text-gray-400">返回前台网站</Link>
          <form action={logout}>
            <button type="submit" className="w-full text-left px-4 py-2 rounded hover:bg-gray-800 text-red-400">
              退出登录 (Logout)
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
