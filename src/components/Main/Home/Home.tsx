import styles from './Home.module.css';
import { HorizontalSidebar } from '../../HorizontalSidebar/HorizontalSidebar';
import { PromoCodes } from './PromoCodes/PromoCodes';
import { Feedback } from './Feedback/Feedback';

export function Home() {
  return (
    <section className={styles.home_page}>
      <h1 className={styles.home_page_title}>Sloth&apos;s galactic store</h1>
      <h2 className={styles.home_page_subtitle}>Ваш портал в мир межгалактических покупок</h2>
      <HorizontalSidebar />
      <PromoCodes />
      <Feedback />
    </section>
  );
}
