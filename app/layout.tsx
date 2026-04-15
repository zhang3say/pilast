import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getSettings } from '@/lib/actions';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.site_name || 'Pilast';
  const suffix = settings.seo_title_suffix || ` | ${siteName} - Professional Pilates Equipment`;
  const defaultTitle = `${siteName}${suffix}`;
  const defaultDesc = settings.seo_description || 'Full Range of Commercial & Home Pilates Machines | Factory Direct | CE Certified | On-Time Delivery';
  const baseUrl = settings.seo_base_url || 'https://www.pilast.com';
  const logoUrl = settings.site_logo ? `${baseUrl}${settings.site_logo}` : `${baseUrl}/logo.png`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: defaultTitle,
      template: `%s${suffix}`
    },
    description: defaultDesc,
    keywords: settings.seo_keywords || 'Commercial Pilates Reformer, Wholesale Pilates Equipment, Home Pilates Machines',
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      url: baseUrl,
      siteName: siteName,
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDesc,
      images: [logoUrl],
    },
    alternates: {
      canonical: '/',
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
