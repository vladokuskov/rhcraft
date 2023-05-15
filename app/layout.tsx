import { siteConfig } from '@/config/site'
import './globals.css'
import localFont from 'next/font/local'
import { Inter, Roboto, Source_Sans_Pro } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
})

const sourceSansPro = Source_Sans_Pro({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans-pro',
})

const fontTabloidScuzzball = localFont({
  src: '../public/fonts/tabloidScuzzball/Tabloid Scuzzball.otf',
  variable: '--font-tabloid',
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ['rhcraft', 'minecraft', 'server', 'realminheart'],
  authors: [
    {
      name: 'swappnet',
      url: 'https://vladokuskov.xyz/',
    },
  ],
  creator: 'swappnet',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#111' },
    { media: '(prefers-color-scheme: dark)', color: '#111' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${fontTabloidScuzzball.variable} ${sourceSansPro.variable} ${inter.variable} ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
