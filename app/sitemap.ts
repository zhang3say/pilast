import { MetadataRoute } from 'next';
import { getProducts, getSettings } from '@/lib/actions';
import { buildSiteUrl, readSetting } from '@/lib/site-settings';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSettings();
  const baseUrl = readSetting(settings.seo_base_url);
  const products = await getProducts();

  if (!baseUrl) {
    return [];
  }

  // Define static routes
  const staticRoutes = [
    '',
    '/about',
    '/quality',
    '/products',
    '/certifications',
    '/custom',
    '/contact',
  ].map((route) => ({
    url: buildSiteUrl(baseUrl, route)!,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/products' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Map products to sitemap entries
  const productRoutes = products.map((product) => ({
    url: buildSiteUrl(baseUrl, `/products/${product.slug}`)!,
    lastModified: new Date(product.created_at || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
