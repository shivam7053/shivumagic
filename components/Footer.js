import styles from './Footer.module.css';
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.textContainer}>
        <p>© 2025 Shivumagic</p>
        <p>Empowering Your Digital Dreams</p>
      </div>
      <a
        href="https://www.instagram.com/shivumagic"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.instagramLink}
        aria-label="Instagram"
      >
        <FaInstagram size={24} />
      </a>
    </footer>
  );
}
