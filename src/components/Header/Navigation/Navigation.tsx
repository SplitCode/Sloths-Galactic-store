import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const locationPath = useLocation().pathname;

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={`/catalog`}>
            Catalog
          </NavLink>
        </li>
        <li>
          <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={`/about`}>
            About
          </NavLink>
        </li>
        {locationPath !== '/login' && locationPath !== '/register' && (
          <>
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={`/login`}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={`/register`}>
                Registration
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navigation;
