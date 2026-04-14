import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pilates Equipment Exporter | Global Supply | Pilast',
  description: 'Full Range of Commercial & Home Pilates Machines | Factory Direct | CE Certified | On-Time Delivery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
