import { getSettings } from '@/lib/actions';
import ContactForm from './ContactForm';
import Image from 'next/image';
import { readSetting } from '@/lib/site-settings';

export const metadata = {
  title: 'Contact Us For Inquiry & Cooperation | Pilast',
  description: 'Contact us for product quotes, customization, sample requests and any other questions.',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string, type?: string }> }) {
  const settings = await getSettings();
  const phone = readSetting(settings.phone);
  const whatsapp = readSetting(settings.whatsapp);
  const email = readSetting(settings.email);
  const address = readSetting(settings.address);
  const resolvedParams = await searchParams;
  const initialProduct = resolvedParams.product || '';
  const initialMessage = resolvedParams.type === 'bulk' ? 'I would like to get a bulk quote for this product.' : '';

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-center mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-contact.jpg"
            alt="Contact Us"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            referrerPolicy="no-referrer"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us For Inquiry & Cooperation
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We are looking forward to establishing long-term cooperative relationships with global distributors, fitness studio owners, gym operators and importers. Please feel free to contact us for product quotes, customization, sample requests and any other questions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone</h4>
                  {phone && <p className="mt-1 text-lg text-gray-900">{phone}</p>}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">WhatsApp</h4>
                  {whatsapp && <p className="mt-1 text-lg text-gray-900">{whatsapp}</p>}
                  {whatsapp && <p className="text-sm text-orange-600 mt-1">24/7 Online for Quick Response</p>}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</h4>
                  {email && (
                    <p className="mt-1 text-lg text-gray-900">
                      <a href={`mailto:${email}`} className="hover:text-orange-600">
                        {email}
                      </a>
                    </p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Company Address</h4>
                  {address && <p className="mt-1 text-lg text-gray-900">{address}</p>}
                </div>
              </div>

              <div className="mt-10 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-800">
                  We will reply to your inquiry within 24 working hours, and provide professional answers and detailed quotes. For urgent matters, please contact us directly via WhatsApp for instant communication.
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Send an Inquiry</h3>
              <ContactForm initialProduct={initialProduct} initialMessage={initialMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
