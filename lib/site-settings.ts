export function readSetting(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function buildSiteUrl(baseUrl?: string | null, pathname = '/') {
  const normalizedBaseUrl = readSetting(baseUrl);
  if (!normalizedBaseUrl) return undefined;
  return new URL(pathname, normalizedBaseUrl).toString();
}

export function buildAssetUrl(baseUrl?: string | null, assetPath?: string | null) {
  const normalizedAssetPath = readSetting(assetPath);
  if (!normalizedAssetPath) return undefined;

  if (/^https?:\/\//i.test(normalizedAssetPath)) {
    return normalizedAssetPath;
  }

  return buildSiteUrl(baseUrl, normalizedAssetPath);
}
