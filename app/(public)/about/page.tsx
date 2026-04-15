import Image from 'next/image';

export const metadata = {
  title: 'About Our Pilates Equipment Foreign Trade Company | Pilast',
  description: 'Professional foreign trade enterprise dedicated to the export of premium pilates equipment.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-about.jpg"
            alt="About Us"
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Our Pilates Equipment Foreign Trade Company
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="prose prose-lg prose-orange max-w-none text-gray-700">
          <p>
            We are a professional foreign trade enterprise dedicated to the export of premium pilates equipment, headquartered in Guangzhou, China. Since our establishment, we have been committed to providing global customers with safe, durable and cost-effective pilates machines, building long-term cooperative relationships with numerous certified manufacturing plants.
          </p>
          
          <p>
            Our team consists of professional foreign trade specialists, quality control inspectors and after-sales service personnel, who have rich experience in international trade, product customization and global logistics. We always adhere to the principle of &quot;Quality First, Customer Supreme&quot;, strictly controlling every production process from raw material selection to finished product inspection, ensuring all products meet international quality and safety standards.
          </p>
          
          <p>
            We export our pilates equipment to more than 50 countries and regions worldwide, including the United States, Canada, the United Kingdom, Germany, France, Australia, Japan, South Korea, UAE and Brazil. We not only provide standard pilates machines, but also offer personalized customization services to help global fitness entrepreneurs and distributors build their own pilates equipment brands.
          </p>
          
          <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500 my-8">
            <h3 className="text-xl font-bold text-gray-900 mt-0 mb-2">Our Mission</h3>
            <p className="mb-0">
              To promote high-quality pilates equipment to the world, support the development of global fitness industry, and become the most reliable pilates equipment supplier for international customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
