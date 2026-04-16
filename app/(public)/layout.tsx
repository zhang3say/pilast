import Link from 'next/link';
import Image from 'next/image';
import { getSettings } from '@/lib/actions';
import Logo from '@/components/Logo';
import PublicMobileNav from '@/components/PublicMobileNav';
import { readSetting } from '@/lib/site-settings';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const siteName = readSetting(settings.site_name);
  const email = readSetting(settings.email);
  const whatsapp = readSetting(settings.whatsapp);
  const address = readSetting(settings.address);
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/quality', label: 'Quality Control' },
    { href: '/custom', label: 'Custom Service' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                {settings.site_logo ? (
                  <Image 
                    src={settings.site_logo} 
                    alt={siteName || 'Site Logo'} 
                    width={150} 
                    height={40} 
                    sizes="150px"
                    className="object-contain h-10 w-auto" 
                  />
                ) : (
                  <>
                    <Logo className="h-8 w-8 text-orange-600" />
                    {siteName && (
                      <span className="text-2xl font-bold text-orange-600 tracking-tight">
                        {siteName}
                      </span>
                    )}
                  </>
                )}
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-gray-700 hover:text-orange-600 px-3 py-2 text-sm font-medium">
                  {item.label}
                </Link>
              ))}
            </nav>
            <PublicMobileNav items={navItems} />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {siteName && <h3 className="text-xl font-bold mb-4">{siteName}</h3>}
            <p className="text-gray-400">Professional Pilates Equipment Exporter. Supplying high-quality commercial and home pilates machines globally.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              {email && <li>Email: {email}</li>}
              {whatsapp && <li>WhatsApp: {whatsapp}</li>}
              {address && <li>Address: {address}</li>}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()}{siteName ? ` ${siteName}` : ''}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
