import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/actions';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Pilast`,
    description: product.overview,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="text-orange-600 hover:text-orange-700 font-medium">
            &larr; Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.image_url || 'https://picsum.photos/seed/placeholder/800/600'}
              alt={product.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-orange-600 font-semibold mb-2 uppercase tracking-wide">{product.category}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>
            
            <div className="prose prose-orange max-w-none mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Overview</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.overview}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="bg-orange-600 hover:bg-orange-700 text-white text-center font-bold py-3 px-8 rounded-full transition duration-300 flex-1">
                Add to Inquiry
              </Link>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}&type=bulk`} className="bg-gray-900 hover:bg-gray-800 text-white text-center font-bold py-3 px-8 rounded-full transition duration-300 flex-1">
                Get Bulk Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Details Tabs/Sections */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Product Parameters</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                {product.parameters.split('\n').map((param: string, i: number) => {
                  const [key, ...valueParts] = param.split(':');
                  if (!valueParts.length) return <li key={i}>{param}</li>;
                  return (
                    <li key={i} className="flex border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                      <span className="font-semibold w-1/3">{key.trim()}:</span>
                      <span className="w-2/3">{valueParts.join(':').trim()}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Product Features</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700 list-disc list-inside">
                {product.features.split('\n').map((feature: string, i: number) => (
                  <li key={i}>{feature.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Packing & Shipping</h3>
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700 space-y-4">
              <p><strong>Packing:</strong> Standard export carton with foam protection, wooden case for bulk orders to avoid damage during transportation.</p>
              <p><strong>Shipping:</strong> Support FOB, CIF, CFR trade terms, cooperate with reliable international logistics companies, ensure safe and fast delivery to all ports worldwide.</p>
            </div>
        </div>

      </div>
    </div>
  );
}
