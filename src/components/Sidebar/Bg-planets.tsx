import styles from './Sidebar.module.css';
import { useAppSelector } from '../../store/hooks';
import marsBig from '../../assets/img/planets/mars.png';
import marsSmall from '../../assets/img/planets/mars1.png';
import venusBig from '../../assets/img/planets/venus.png';
import venusSmall from '../../assets/img/planets/venus1.png';
import earthBig from '../../assets/img/planets/earth.png';
import earthSmall from '../../assets/img/planets/earth1.png';
import { Planets } from '../../store/slices/planet-slice';
import { useLocation } from 'react-router-dom';

export function BgPlanets() {
  const locationPath = useLocation().pathname;
  const notShow = ['/login', '/register', '/cart'].includes(locationPath);
  const planet = useAppSelector((state) => state.planet_slice.planet);

  const srcBig = planet === Planets.earth ? earthBig : planet === Planets.mars ? marsBig : venusBig;
  const srcSmall = planet === Planets.earth ? earthSmall : planet === Planets.mars ? marsSmall : venusSmall;

  return (
    !notShow && (
      <div className={styles.bg}>
        <img src={srcBig} className={styles.planet_big} alt={'Planet'} />
        <img src={srcSmall} className={styles.planet_small} alt={'Planet'} />
      </div>
    )
  );
}
