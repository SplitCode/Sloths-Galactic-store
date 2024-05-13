import { useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';

export function Navigation() {
  const locationPath = useLocation().pathname;

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink text={'Catalog'} to={`/catalog`} />
        </li>
        <li>
          <CustomNavLink text={'About'} to={`/about`} />
        </li>
        {locationPath !== '/login' && locationPath !== '/register' && (
          <>
            <li>
              <CustomNavLink text={'Login'} to={'/login'} />
            </li>
            <li>
              <CustomNavLink text={'Registration'} to={'/register'} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
