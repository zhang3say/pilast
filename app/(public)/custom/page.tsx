import Image from 'next/image';

export const metadata = {
  title: 'Custom Pilates Equipment Solutions | Pilast',
  description: 'Comprehensive customization services to meet your personalized needs for pilates equipment.',
};

export default function CustomServicePage() {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-custom.jpg"
            alt="Custom Service"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Custom Pilates Equipment Solutions
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We understand that different customers have unique demands for pilates equipment, so we provide comprehensive customization services to meet your personalized needs, whether you are a studio owner, brand distributor or individual buyer.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Customization Scope</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">&#10003;</span>
                <div>
                  <strong className="text-gray-900 block">Color Customization</strong>
                  <span className="text-gray-600">Multiple color options for machine frame, padding and accessories, match your studio decoration style or brand color.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">&#10003;</span>
                <div>
                  <strong className="text-gray-900 block">Logo Customization</strong>
                  <span className="text-gray-600">Print or engrave your brand logo on the pilates equipment, enhance your brand awareness.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">&#10003;</span>
                <div>
                  <strong className="text-gray-900 block">Size & Configuration Customization</strong>
                  <span className="text-gray-600">Adjust product size, spring tension, accessory configuration according to your usage scenarios and training needs.</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2 mt-1">&#10003;</span>
                <div>
                  <strong className="text-gray-900 block">Package Customization</strong>
                  <span className="text-gray-600">Customize complete studio set packages based on your studio area, budget and business positioning.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Custom Process</h2>
            <ol className="space-y-4 list-decimal list-inside text-gray-700">
              <li className="pb-2 border-b border-gray-200">Send your custom requirements (color, logo, size, quantity, etc.) via email or WhatsApp.</li>
              <li className="pb-2 border-b border-gray-200">Our team will confirm the details and provide a customized quote and design draft.</li>
              <li className="pb-2 border-b border-gray-200">Confirm the design and price, sign the cooperation agreement and pay the deposit.</li>
              <li className="pb-2 border-b border-gray-200">Arrange production and send sample confirmation (for bulk custom orders).</li>
              <li>Complete production, conduct quality inspection and arrange shipment.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
