import Image from 'next/image';

export const metadata = {
  title: 'Our Certifications | Pilast',
  description: 'We hold a number of international quality and safety certifications.',
};

export default function CertificationsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-cert.jpg"
            alt="Our Certifications"
            fill
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Certifications
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We hold a number of international quality and safety certifications, which are the proof of our product quality and compliance. We can provide original certification documents for our global customers to meet customs clearance and market supervision requirements.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white p-8 rounded-lg shadow-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'CE Certification',
              'ISO9001 Quality Management System Certification',
              'SGS Test Report',
              'Product Safety Test Certificate',
              'Export Product Quality License'
            ].map((cert, i) => (
              <li key={i} className="flex items-center p-4 bg-gray-50 rounded border border-gray-100">
                <span className="text-orange-600 mr-3 text-2xl">&#10003;</span>
                <span className="text-gray-800 font-medium">{cert}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
            <strong>Note:</strong> All certifications are valid and can be verified officially, ensuring our pilates equipment can be sold smoothly in global markets.
          </div>
        </div>
      </div>
    </div>
  );
}
