import { getProducts, deleteProduct, updateProductHotStatus } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">产品管理</h1>
        <div className="flex gap-4">
          <Link href="/admin/products/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium shadow-md transition">
            添加新产品
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">图片</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品名称</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">首页热门</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-16 relative rounded overflow-hidden">
                    <Image src={product.image_url || 'https://picsum.photos/seed/placeholder/100/100'} alt={product.name} fill sizes="64px" className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <form action={async () => {
                    'use server';
                    await updateProductHotStatus(product.id, !Boolean(product.is_hot));
                  }}>
                    <button
                      type="submit"
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition ${
                        product.is_hot
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {product.is_hot ? '已设为热门' : '设为热门'}
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/products/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">编辑</Link>
                  <form action={async () => {
                    'use server';
                    await deleteProduct(product.id);
                  }} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">删除</button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">暂无产品</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
