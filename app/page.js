import Image from 'next/image';
import styles from './page.module.css';

import HeroSection from '../components/HeroSection';
import ServiceCatalog from '../components/ServiceCatalog';
import AboutCompanySection from '../components/AboutCompanySection';
import FeaturedServicesSection from '../components/FeaturedServicesSection';
import CallToActionBanner from '../components/CallToActionBanner';
import OrderForm from '../components/OrderForm';

export default function Home() {
  return (
    <div className={styles.background}>
      {/* Overlay to improve text readability */}
      <div className={styles.overlay} />

      <main className={styles.container} role="main" aria-label="Main content">
        <section className={styles.section}>
          <HeroSection />
        </section>

        <section className={styles.section}>
          <OrderForm />
        </section>

        <section className={styles.section}>
          <ServiceCatalog />
        </section>

        <section className={styles.section}>
          <AboutCompanySection />
        </section>

        <section className={styles.section}>
          <FeaturedServicesSection />
        </section>

        <section className={styles.section}>
          <CallToActionBanner />
        </section>
      </main>
    </div>
  );
}
