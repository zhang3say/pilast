import Image from 'next/image';
import Link from 'next/link';
import { getPaginatedProducts, getCategories } from '@/lib/actions';

export const metadata = {
  title: 'Our Pilates Equipment Range | Pilast',
  description: 'Full line of high-grade pilates equipment for commercial fitness studios, gyms, rehabilitation centers and home use.',
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page) : 1;
  const search = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';

  const { products, totalPages, currentPage, totalItems } = await getPaginatedProducts({
    page,
    limit: 9,
    search,
    category
  });

  const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Pilates Equipment Range"
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Pilates Equipment Range
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We offer a full line of high-grade pilates equipment for commercial fitness studios, gyms, rehabilitation centers and home use.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
              <form action="/products" method="GET">
                {category && <input type="hidden" name="category" value={category} />}
                <div className="flex">
                  <input 
                    type="text" 
                    name="q" 
                    defaultValue={search}
                    placeholder="Search products..." 
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                  <button type="submit" className="bg-orange-600 text-white px-3 py-2 rounded-r-md hover:bg-orange-700">
                    Go
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href={`/products${search ? `?q=${search}` : ''}`}
                    className={`block px-2 py-1 rounded ${!category ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'}`}
                  >
                    All Products
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/products?category=${encodeURIComponent(cat)}${search ? `&q=${search}` : ''}`}
                      className={`block px-2 py-1 rounded ${category === cat ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {category ? category : 'All Products'}
              </h2>
              <span className="text-gray-500 text-sm">{totalItems} products found</span>
            </div>

            {products.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Link href="/products" className="inline-block mt-4 text-orange-600 hover:underline">
                  Clear filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
                      <div className="relative h-56">
                        <Image
                          src={product.image_url || 'https://picsum.photos/seed/placeholder/400/300'}
                          alt={product.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="text-xs text-orange-600 font-semibold mb-1 uppercase tracking-wider">{product.category}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.overview}</p>
                        <Link href={`/products/${product.slug}`} className="inline-block bg-gray-900 hover:bg-gray-800 text-white text-center font-semibold py-2 px-4 rounded transition duration-300">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      {currentPage > 1 && (
                        <Link 
                          href={`/products?page=${currentPage - 1}${category ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${search}` : ''}`}
                          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          Previous
                        </Link>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link
                          key={pageNum}
                          href={`/products?page=${pageNum}${category ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${search}` : ''}`}
                          className={`px-4 py-2 rounded-md border ${
                            currentPage === pageNum 
                              ? 'bg-orange-600 text-white border-orange-600' 
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      ))}

                      {currentPage < totalPages && (
                        <Link 
                          href={`/products?page=${currentPage + 1}${category ? `&category=${encodeURIComponent(category)}` : ''}${search ? `&q=${search}` : ''}`}
                          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          Next
                        </Link>
                      )}
                    </nav>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
