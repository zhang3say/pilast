import Image from 'next/image';
import Link from 'next/link';
import { getProducts, getSettings } from '@/lib/actions';

export default async function Home() {
  const products = await getProducts();
  const settings = await getSettings();
  const hotProducts = products.slice(0, 4);

  const baseUrl = settings.seo_base_url || 'https://www.pilast.com';
  const logoUrl = settings.site_logo ? `${baseUrl}${settings.site_logo}` : `${baseUrl}/logo.png`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.site_name || 'Pilast',
    url: baseUrl,
    logo: logoUrl,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.phone,
      contactType: 'sales',
      email: settings.email,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Banner */}
      <section className="relative h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Pilates Equipment"
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Professional Pilates Equipment Exporter | Global Supply
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Full Range of Commercial & Home Pilates Machines | Factory Direct | CE Certified | On-Time Delivery
          </p>
          <p className="text-2xl font-bold text-orange-500 mb-8 italic">
            &quot;long-last Pilates machines, long-last partnership. Last long forever...&quot;
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              Get Latest Quote
            </Link>
            <Link href="/products" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300">
              View Full Product Line
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Brief */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            We are a leading foreign trade company specializing in the export of high-quality pilates equipment, with years of experience serving global fitness studios, gyms, sports centers, home users and distributors. Our product line covers core pilates machines including reformers, Cadillac beds, stability chairs, ladder barrels and complete studio sets, all manufactured in certified factories with strict quality control. We export to over 50 countries and regions across Europe, North America, Australia, Asia and the Middle East, providing one-stop procurement solutions, customized services and reliable after-sales support for global clients.
          </p>
        </div>
      </section>

      {/* Hot Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Hot Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <div className="relative h-48">
                  <Image
                    src={product.image_url || 'https://picsum.photos/seed/placeholder/400/300'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.overview}</p>
                  <Link href={`/products/${product.slug}`} className="text-orange-600 font-semibold hover:text-orange-700">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products" className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition duration-300">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Factory Direct Supply', desc: 'Cut middlemen, offer competitive wholesale prices, ensure stable production capacity and sufficient inventory for bulk orders.' },
              { title: 'International Quality Certifications', desc: 'All products comply with EU CE, ISO quality standards, pass strict safety and durability tests, safe for commercial and home use.' },
              { title: 'Customization Available', desc: 'Support custom color, logo, size and configuration, tailor-made products to meet your local market demands and brand needs.' },
              { title: 'Professional Export Service', desc: 'Experienced foreign trade team, familiar with global trade rules, efficient document handling, flexible shipping (FOB/CIF/CFR), full container and LCL accepted.' },
              { title: 'On-Time Delivery', desc: 'Complete production and logistics system, strict delivery schedule, ensure quick lead time for sample and bulk orders.' },
              { title: 'Reliable After-Sales', desc: 'Provide detailed installation instructions, video guidance and long-term after-sales support, solve product problems promptly.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Market */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Our Global Market</h2>
          <p className="text-xl mb-8">Export Pilates Excellence to the World</p>
          <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
            <span>Europe</span> &bull; <span>North America</span> &bull; <span>South America</span> &bull; <span>Australia</span> &bull; <span>Asia</span> &bull; <span>Middle East</span> &bull; <span>Africa</span>
          </div>
        </div>
      </section>
    </div>
  );
}
