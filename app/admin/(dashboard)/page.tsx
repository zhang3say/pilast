import { getProducts, getInquiries } from '@/lib/actions';
import Link from 'next/link';

export default async function AdminDashboard() {
  const products = await getProducts();
  const inquiries = await getInquiries();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">仪表盘</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">总产品数</h3>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          <div className="mt-4">
            <Link href="/admin/products" className="text-blue-600 hover:underline">管理产品 &rarr;</Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-500 mb-2">总询盘数</h3>
          <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
          <div className="mt-4">
            <Link href="/admin/inquiries" className="text-blue-600 hover:underline">查看询盘 &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
