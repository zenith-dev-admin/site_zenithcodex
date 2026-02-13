import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://zenithcodex.com' // Altere para seu domínio real

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/api/', // Bloqueia bots de indexarem suas rotas de API
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
