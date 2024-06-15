import styles from './Home.module.css';
import { HorizontalSidebar } from '../../HorizontalSidebar/HorizontalSidebar';

export function Home() {
  return (
    <section className={styles.home_page}>
      <h1 className={styles.home_page_title}>Sloth&apos;s galactic store</h1>
      <h2 className={styles.home_page_subtitle}>ваш портал в мир межгалактических покупок</h2>
      <HorizontalSidebar />
      <h2 className={styles.home_text}>
        Действуют скидки на товары для кроссчека и сладенькое!
        <br /> Ищите&nbsp;
        <span className={styles.accent_text}>перечеркнутые</span> ценники!
      </h2>
    </section>
  );
}
