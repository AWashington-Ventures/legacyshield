import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://legacyshieldpro.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://legacyshieldpro.com/signup', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://legacyshieldpro.com/login', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://legacyshieldpro.com/privacy-policy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://legacyshieldpro.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
