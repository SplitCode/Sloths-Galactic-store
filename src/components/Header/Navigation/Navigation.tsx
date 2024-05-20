import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';
import { useAppSelector } from '../../../store/hooks';
import { Logout } from '../Logout/Logout';
import type { NavigationProps } from '../Header.interfaces';

export function Navigation({ menuOpen, toggleMenuOpen }: Required<NavigationProps>) {
  const isAuth = useAppSelector((state) => state.customer_slice.customerId);

  return (
    <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink text={'Каталог'} to={`/catalog`} toggleMenuOpen={toggleMenuOpen} />
        </li>
        <li>
          <CustomNavLink text={'О нас'} to={`/about`} toggleMenuOpen={toggleMenuOpen} />
        </li>
        {!isAuth && (
          <>
            <li>
              <CustomNavLink text={'Регистрация'} to={'/register'} toggleMenuOpen={toggleMenuOpen} />
            </li>
            <li>
              <CustomNavLink text={'Вход'} to={'/login'} toggleMenuOpen={toggleMenuOpen} />
            </li>
          </>
        )}
        {isAuth && (
          <>
            <li>
              <CustomNavLink text={'Профиль'} to={'/profile'} toggleMenuOpen={toggleMenuOpen} />
            </li>
            <li>
              <Logout toggleMenuOpen={toggleMenuOpen} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
