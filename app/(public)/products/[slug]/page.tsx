import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getSettings } from '@/lib/actions';
import { notFound } from 'next/navigation';
import ProductImageGallery from './ProductImageGallery';
import type { Metadata } from 'next';
import { buildSiteUrl, readSetting } from '@/lib/site-settings';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata | null> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const settings = await getSettings();
  const baseUrl = readSetting(settings.seo_base_url);
  const siteName = readSetting(settings.site_name);
  const images = product.images ? JSON.parse(product.images) : [product.image_url];
  const ogImage = images.length > 0 ? images
    .map((img: string) => buildSiteUrl(baseUrl, img))
    .find(Boolean) : undefined;

  const title = product.name;
  const description = product.seo_description || product.overview;
  const keywords = product.seo_keywords || `${product.category}, ${product.name}, Pilates Equipment`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: buildSiteUrl(baseUrl, `/products/${product.slug}`),
      siteName,
      images: ogImage ? [{ url: ogImage, width: 800, height: 800, alt: product.name }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const settings = await getSettings();
  const baseUrl = readSetting(settings.seo_base_url);
  const siteName = readSetting(settings.site_name);
  const images = product.images ? JSON.parse(product.images) : [product.image_url];
  const description = product.seo_description || product.overview;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images.length > 0 ? images
      .map((img: string) => buildSiteUrl(baseUrl, img))
      .filter(Boolean) : undefined,
    description: description,
    category: product.category,
    brand: siteName ? {
      '@type': 'Brand',
      name: siteName,
    } : undefined,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      url: buildSiteUrl(baseUrl, `/products/${product.slug}`),
    },
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 font-sans">
          <Link href="/products" className="text-orange-600 hover:text-orange-700 font-medium transition flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 font-sans">
          {/* Product Image Carousel */}
          <ProductImageGallery images={images} productName={product.name} />

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-orange-600 font-bold mb-2 uppercase tracking-widest">{product.category}</div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">{product.name}</h1>
            
            <div className="prose prose-orange max-w-none mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Product Overview</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{product.overview}</p>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="bg-orange-600 hover:bg-orange-700 text-white text-center font-black py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-orange-200 uppercase tracking-wide">
                Add to Inquiry
              </Link>
              <Link href={`/contact?product=${encodeURIComponent(product.name)}&type=bulk`} className="bg-gray-900 hover:bg-gray-800 text-white text-center font-black py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-gray-400 uppercase tracking-wide">
                Get Bulk Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details (Rich Text) */}
        {product.details_html && (
          <div className="mt-20 pt-10 border-t border-gray-100">
            <h3 className="text-3xl font-black text-gray-900 mb-10 text-center">Detailed Specifications</h3>
            <div 
              className="prose prose-lg max-w-none mx-auto bg-gray-50 p-8 sm:p-12 rounded-3xl shadow-inner text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.details_html }}
            />
          </div>
        )}

        {/* Details Tabs/Sections */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-8 border-b border-orange-100 pb-4">Product Parameters</h3>
            <ul className="space-y-4 text-gray-700">
              {product.parameters.split('\n').map((param: string, i: number) => {
                const [key, ...valueParts] = param.split(':');
                if (!valueParts.length) return <li key={i} className="text-sm font-medium bg-gray-50 p-3 rounded-xl">{param}</li>;
                return (
                  <li key={i} className="flex border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <span className="font-bold w-1/3 text-gray-900">{key.trim()}</span>
                    <span className="w-2/3 text-gray-600">{valueParts.join(':').trim()}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-8 border-b border-orange-100 pb-4">Key Features</h3>
            <ul className="space-y-4 text-gray-700">
              {product.features.split('\n').map((feature: string, i: number) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 bg-orange-100 text-orange-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{feature.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-8 border-b border-gray-800 pb-4">Packing & Shipping</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-300 leading-relaxed">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-orange-500 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Packing Info
                </div>
                <p>Standard export carton with foam protection, wooden case for bulk orders to avoid damage during transportation.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-orange-500 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Shipping Methods
                </div>
                <p>Support FOB, CIF, CFR trade terms, cooperate with reliable international logistics companies, ensure safe and fast delivery to all ports worldwide.</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 opacity-5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
        </div>

      </div>
    </div>
  );
}
