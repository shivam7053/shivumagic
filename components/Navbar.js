import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brandContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        <span className={styles.brand}>Shivumagic</span>
      </div>

      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/request" className={styles.link}>
          Request
        </Link>
        <Link href="/contact" className={styles.link}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
