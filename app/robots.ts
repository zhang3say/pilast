import { MetadataRoute } from 'next';
import { getSettings } from '@/lib/actions';
import { buildSiteUrl, readSetting } from '@/lib/site-settings';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const baseUrl = readSetting(settings.seo_base_url);

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: buildSiteUrl(baseUrl, '/sitemap.xml'),
  };
}
