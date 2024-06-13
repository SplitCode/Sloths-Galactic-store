import { BgPlanets } from '../../Sidebar/Bg-planets';
import { useAppSelector } from '../../../store/hooks';
import styles from './About.module.css';

export function About() {
  const planet = useAppSelector((state) => state.planet_slice.planet);
  return (
    <section className={styles.home_page}>
      {planet && <BgPlanets />}
      <h1>О нас</h1>
    </section>
  );
}
