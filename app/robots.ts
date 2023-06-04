import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/404', '/dashboard', '/dashboard/settings', '/login'],
    },
    sitemap: './sitemap.xml.ts',
  }
}
