import styles from './Sidebar.module.css';
import { useAppSelector } from '../../store/hooks';
import marsBig from '../../assets/img/planets/mars.png';
import marsSmall from '../../assets/img/planets/mars1.png';
import venusBig from '../../assets/img/planets/venus.png';
import venusSmall from '../../assets/img/planets/venus1.png';
import earthBig from '../../assets/img/planets/earth.png';
import earthSmall from '../../assets/img/planets/earth1.png';
import { Planets } from '../../store/slices/planet-slice';

export function BgPlanets() {
  const planet = useAppSelector((state) => state.planet_slice.planet);

  const srcBig = planet === Planets.earth ? earthBig : planet === Planets.mars ? marsBig : venusBig;
  const srcSmall = planet === Planets.earth ? earthSmall : planet === Planets.mars ? marsSmall : venusSmall;

  return (
    planet && (
      <div className={styles.bg}>
        <img src={srcBig} className={styles.planet_big} alt={'Planet'} />
        <img src={srcSmall} className={styles.planet_small} alt={'Planet'} />
      </div>
    )
  );
}
