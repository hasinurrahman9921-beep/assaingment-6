import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PlanProvider } from '@/context/PlanContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'FITLOG - Workout Library',
  description: 'Track and manage your workout routines',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="bg-[#090b0d] text-white min-h-screen flex flex-col font-sans">
        <PlanProvider>
          <Toaster position="top-right" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}