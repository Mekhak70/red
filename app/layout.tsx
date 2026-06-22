import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Geist_Mono } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://store2021.am'),
  title: {
    default: '2021 — Օնլայն սուպերմարկետ | Առաքում Երևանում',
    template: '%s | 2021 Սուպերմարկետ',
  },
  description:
    '2021 — ժամանակակից օնլայն սուպերմարկետ Հայաստանում։ Թարմ մթերք, խմիչքներ, կենցաղային ապրանքներ։ Արագ առաքում և վճարում առաքման պահին։ Հասցե՝ Գայ համայնք, Երևանյան 45։',
  keywords: [
    'սուպերմարկետ',
    'օնլайн խանութ',
    'մթերք',
    'առաքում Երևան',
    '2021 store',
    'Armenia grocery',
  ],
  generator: 'v0.app',
  openGraph: {
    title: '2021 — Օնլայն սուպերմարկետ',
    description: 'Թարմ մթերք և արագ առաքում Երևանում։ Վճարում առաքման պահին։',
    locale: 'hy_AM',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#B11E22',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="hy"
      className={`light ${manrope.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <CartProvider>{children}</CartProvider>
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
