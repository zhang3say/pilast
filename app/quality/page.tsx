import Image from 'next/image';

export const metadata = {
  title: 'Quality Control & Product Safety | Pilast',
  description: 'We take quality control as the core of our business, ensuring every product meets international standards.',
};

export default function QualityPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/quality-pilates/1920/600"
            alt="Quality Control"
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quality Control & Product Safety
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We take quality control as the core of our business, as we know that safety and durability are the top priorities for pilates equipment users. We have established a complete and strict quality management system to ensure every product meets international standards.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Our QC Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-orange-600 font-bold text-xl mb-2">01. Raw Material Inspection</div>
                <p className="text-gray-700">Select high-quality steel, wood, PU leather and other raw materials, conduct strict sampling tests before production to ensure material strength and environmental protection.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-orange-600 font-bold text-xl mb-2">02. Production Process Monitoring</div>
                <p className="text-gray-700">Professional QC team inspects each production link, including welding, assembly, padding and packaging, to eliminate defective products.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-orange-600 font-bold text-xl mb-2">03. Finished Product Testing</div>
                <p className="text-gray-700">Conduct comprehensive performance tests on finished products, including load-bearing test, sliding smoothness test, spring tension test and safety test, to ensure product stability and safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-orange-600 font-bold text-xl mb-2">04. Pre-Shipment Inspection</div>
                <p className="text-gray-700">Conduct final full inspection before shipment, check product appearance, size, accessories and packaging, only qualified products are allowed to be delivered.</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-lg shadow-md border-t-4 border-orange-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Certifications</h2>
            <p className="text-gray-700">
              All our pilates equipment has obtained CE Certification, ISO9001 Quality Management System Certification, and complies with EU and US fitness equipment safety standards. We can provide relevant certification documents for customer customs clearance and market access.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
