import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getSettings } from '@/lib/actions';
import { buildAssetUrl, buildSiteUrl, readSetting } from '@/lib/site-settings';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = readSetting(settings.site_name);
  const suffix = readSetting(settings.seo_title_suffix);
  const defaultDesc = readSetting(settings.seo_description);
  const baseUrl = readSetting(settings.seo_base_url);
  const logoUrl = buildAssetUrl(baseUrl, settings.site_logo);
  const siteUrl = buildSiteUrl(baseUrl, '/');
  const title = suffix
    ? {
        default: siteName || '',
        template: `%s${suffix}`,
      }
    : siteName;

  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    title,
    description: defaultDesc,
    keywords: readSetting(settings.seo_keywords),
    openGraph: {
      title: siteName,
      description: defaultDesc,
      url: siteUrl,
      siteName,
      images: logoUrl
        ? [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ]
        : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: defaultDesc,
      images: logoUrl ? [logoUrl] : undefined,
    },
    alternates: baseUrl
      ? {
          canonical: '/',
        }
      : undefined,
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
