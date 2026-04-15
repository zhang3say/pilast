import { deleteProduct, getAdminPaginatedProducts, getCategories, updateProductHotStatus } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';

function buildAdminProductsHref({
  page,
  search,
  category,
}: {
  page?: number;
  search?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.set('page', String(page));
  }

  if (search) {
    params.set('q', search);
  }

  if (category) {
    params.set('category', category);
  }

  const query = params.toString();
  return query ? `/admin/products?${query}` : '/admin/products';
}

function getVisiblePages(currentPage: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(pages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export default async function AdminProducts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? Number.parseInt(resolvedParams.page, 10) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q.trim() : '';
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  const categories = await getCategories();
  const { products, totalPages, currentPage, totalItems } = await getAdminPaginatedProducts({
    page: Number.isFinite(page) ? page : 1,
    limit: 10,
    search,
    category,
  });
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">产品管理</h1>
          <p className="mt-2 text-sm text-gray-500">
            {search || category
              ? `当前筛选结果共 ${totalItems} 条`
              : `当前共 ${totalItems} 个产品`}
          </p>
        </div>
        <Link href="/admin/products/new" prefetch={false} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition hover:bg-blue-700">
          添加新产品
        </Link>
      </div>

      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <form action="/admin/products" method="GET" className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_220px_auto_auto]">
          <div>
            <label htmlFor="product-search" className="mb-1 block text-sm font-medium text-gray-700">
              搜索产品
            </label>
            <input
              id="product-search"
              type="text"
              name="q"
              defaultValue={search}
              placeholder="按产品名、Slug 或简介搜索"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="product-category" className="mb-1 block text-sm font-medium text-gray-700">
              分类
            </label>
            <select
              id="product-category"
              name="category"
              defaultValue={category}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">全部分类</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="h-10 self-end rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            查询
          </button>

          <Link
            href="/admin/products"
            prefetch={false}
            className="inline-flex h-10 items-center justify-center self-end rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            清空
          </Link>
        </form>

        {(search || category) && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {search && (
              <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                搜索: {search}
              </span>
            )}
            {category && (
              <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-700">
                分类: {category}
              </span>
            )}
          </div>
        )}
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
                  <Link href={`/admin/products/${product.id}`} prefetch={false} className="text-indigo-600 hover:text-indigo-900 mr-4">编辑</Link>
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

      {totalPages > 1 && (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            第 {currentPage} / {totalPages} 页
          </p>
          <nav className="flex flex-wrap items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={buildAdminProductsHref({ page: currentPage - 1, search, category })}
                prefetch={false}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                上一页
              </Link>
            )}

            {visiblePages.map((pageNum, index) => {
              const prevPage = visiblePages[index - 1];
              const showGap = prevPage && pageNum - prevPage > 1;

              return (
                <span key={pageNum} className="flex items-center gap-2">
                  {showGap && <span className="px-1 text-gray-400">...</span>}
                  <Link
                    href={buildAdminProductsHref({ page: pageNum, search, category })}
                    prefetch={false}
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      currentPage === pageNum
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </Link>
                </span>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={buildAdminProductsHref({ page: currentPage + 1, search, category })}
                prefetch={false}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                下一页
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
