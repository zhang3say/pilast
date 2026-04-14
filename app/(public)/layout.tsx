import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '@/lib/actions';
import Logo from '@/components/Logo';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                {settings.site_logo ? (
                  <Image 
                    src={settings.site_logo} 
                    alt={settings.site_name || 'Pilast'} 
                    width={150} 
                    height={40} 
                    className="object-contain h-10 w-auto" 
                  />
                ) : (
                  <>
                    <Logo className="h-8 w-8 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-600 tracking-tight">
                      {settings.site_name || 'Pilast'}
                    </span>
                  </>
                )}
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">About Us</Link>
              <Link href="/quality" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Quality Control</Link>
              <Link href="/custom" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Custom Service</Link>
              <Link href="/certifications" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Certifications</Link>
              <Link href="/contact" className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">Contact Us</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{settings.site_name || 'Pilast'}</h3>
            <p className="text-gray-400">Professional Pilates Equipment Exporter. Supplying high-quality commercial and home pilates machines globally.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-white">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: {settings.email || 'sales@example.com'}</li>
              <li>WhatsApp: {settings.whatsapp || '+86 123 4567 8900'}</li>
              <li>Address: {settings.address || 'Guangzhou, China'}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {settings.site_name || 'Pilast'}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
