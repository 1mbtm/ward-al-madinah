import type { Metadata } from 'next';
import { Philosopher } from 'next/font/google';
import '@/styles/globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { CartProvider } from '@/components/providers/CartProvider';

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-philosopher',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Madinah Rose | Signature Rose Ice Cream & Gelateria - Madinah',
  description: 'Experience the famous viral Medina Rose Ice Cream misted with authentic Madinah rose water near Al-Masjid an-Nabawi.',
  openGraph: {
    title: 'Madinah Rose | Signature Rose Ice Cream & Gelateria - Madinah',
    description: 'The famous viral Medina Rose Ice Cream misted with authentic Madinah rose water.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={philosopher.variable}>
      <head>
      </head>
      <body>
        <SmoothScrollProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
