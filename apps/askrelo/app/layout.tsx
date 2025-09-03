import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import StickyAsk from './components/StickyAsk';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
});

export const metadata = {
  title: 'Relo Network - Relocate to London. Effortlessly.',
  description: 'Vetted experts, elite services, and a 24/7 AI concierge - one accountable partner from landing to "I live here."',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <StickyAsk />
      </body>
    </html>
  );
}