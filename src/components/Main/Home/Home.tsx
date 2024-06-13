import styles from './Home.module.css';
import { BgPlanets } from '../../Sidebar/Bg-planets';
import { useAppSelector } from '../../../store/hooks';
import { HorizontalSidebar } from '../../HorizontalSidebar/HorizontalSidebar';

export function Home() {
  const planet = useAppSelector((state) => state.planet_slice.planet);
  return (
    <section className={styles.home_page}>
      {planet && <BgPlanets />}
      <h1 className={styles.home_page_title}>Sloth&apos;s galactic store</h1>
      <h2 className={styles.home_page_subtitle}>ваш портал в мир межгалактических покупок</h2>
      <HorizontalSidebar />
      <h2 className={styles.home_text}>
        Действуют скидки на товары для кроссчека и сладенькое!
        <br /> Ищите
        <span className={styles.accent_text}> перечеркнутые ценники</span> на страницах нашего магазина!
      </h2>
    </section>
  );
}
