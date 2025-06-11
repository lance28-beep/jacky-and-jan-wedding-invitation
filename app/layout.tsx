import type { Metadata } from 'next'
import { Inter, Great_Vibes, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-great-vibes' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Jackey & Jan - Wedding Invitation',
  description: 'Join us in celebrating the wedding of Jackey & Jan on December 10, 2025 at Nature\'s Village Resort, Bacolod City. RSVP now to be part of our special day.',
  keywords: 'wedding, invitation, Jackey Jan, Bacolod wedding, Nature\'s Village Resort, December 2025 wedding',
  authors: [{ name: 'Jackey & Jan' }],
  creator: 'Jackey & Jan',
  publisher: 'Jackey & Jan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jackandjan.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon_io/favicon.ico',
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon_io/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon_io/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
  openGraph: {
    title: 'Jackey & Jan - Wedding Invitation',
    description: 'Join us in celebrating the wedding of Jackey & Jan on December 10, 2025 at Nature\'s Village Resort, Bacolod City.',
    url: 'https://jackandjan.com',
    siteName: 'Jackey & Jan Wedding',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/couple_image/image_3.png',
        width: 1200,
        height: 630,
        alt: 'Jackey & Jan Wedding Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jackey & Jan - Wedding Invitation',
    description: 'Join us in celebrating the wedding of Jackey & Jan on December 10, 2025 at Nature\'s Village Resort, Bacolod City.',
    images: ['/couple_image/image_3.png'],
    creator: '@jackandjan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${greatVibes.variable} ${playfairDisplay.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
