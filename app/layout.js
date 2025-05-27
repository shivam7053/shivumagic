// app/layout.js or app/layout.tsx (for TypeScript)
import './globals.css'; // if using Tailwind or global CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Shivumagic',
  description: 'Empowering Your Digital Dreams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
