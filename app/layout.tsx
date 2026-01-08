import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from './providers';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Coin Shack - Luxury Live Coin Streaming & Commerce',
  description: 'Premium platform for live coin streaming, auctions, and commerce',
  keywords: ['coins', 'numismatics', 'auctions', 'live streaming', 'precious metals'],
  authors: [{ name: 'The Coin Shack' }],
  openGraph: {
    title: 'The Coin Shack',
    description: 'Luxury Live Coin Streaming & Commerce',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cinzel.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

