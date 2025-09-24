import type { Metadata } from 'next'
import { Inter, Great_Vibes, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import BackgroundMusic from '@/components/BackgroundMusic'

const inter = Inter({ subsets: ['latin'] })
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-great-vibes' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Jackey & Jan - Wedding Invitation',
  description:
    "You're invited to the wedding of Jackey and Jan! Join us on December 10, 2025, at Nature's Village Resort, Bacolod City. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Jackey Jan wedding, Bacolod wedding, Nature's Village Resort, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2025 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Philippines, #TheJackAndJanWedding",
  authors: [
    { name: 'Jackey' },
    { name: 'Jan' },
  ],
  creator: 'Jackey & Jan',
  publisher: 'Jackey & Jan',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL('https://jacky-and-jan-wedding-invitation.vercel.app'),
  alternates: {
    canonical: 'https://jacky-and-jan-wedding-invitation.vercel.app/',
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
    title: 'Jackey & Jan Wedding | December 10, 2025 | Bacolod',
    description:
      "Celebrate the union of Jackey and Jan on December 10, 2025, in Bacolod City, Philippines. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: 'https://jacky-and-jan-wedding-invitation.vercel.app/',
    siteName: 'Jackey & Jan Wedding',
    locale: 'en_PH',
    type: 'website',
    images: [
      {
        url: 'https://jacky-and-jan-wedding-invitation.vercel.app/couple_image/image_5.png',
        width: 1200,
        height: 630,
        alt: 'Jackey & Jan Wedding Invitation - December 10, 2025, Bacolod',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jackey & Jan Wedding Invitation',
    description:
      "You're invited to the wedding of Jackey and Jan! December 10, 2025, Bacolod City, Philippines. RSVP, view our gallery, and leave a message! #TheJackAndJanWedding",
    images: ['https://jacky-and-jan-wedding-invitation.vercel.app/couple_image/image_5.png'],
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
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: 'Jackey & Jan Wedding',
      startDate: '2025-12-10T16:00:00+08:00',
      endDate: '2025-12-10T22:00:00+08:00',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: [
        {
          '@type': 'Place',
          name: "Nature's Village Resort",
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Talisay Highway',
            addressLocality: 'Metro Bacolod',
            postalCode: '6115',
            addressRegion: 'Negros Occidental',
            addressCountry: 'PH',
          },
        },
      ],
      image: ['https://jacky-and-jan-wedding-invitation.vercel.app/couple_image/image_5.png'],
      description:
        "You're invited to the wedding of Jackey and Jan! Join us on December 10, 2025, at Nature's Village Resort, Bacolod City. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        '@type': 'Person',
        name: 'Jackey & Jan',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://jacky-and-jan-wedding-invitation.vercel.app/',
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'PHP',
      },
      eventHashtag: '#TheJackAndJanWedding',
    }),
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
        <BackgroundMusic />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
