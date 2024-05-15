import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';
import { useAppSelector } from '../../../store/hooks';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.customer_slice.customerId);

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink text={'Catalog'} to={`/catalog`} />
        </li>
        <li>
          <CustomNavLink text={'About'} to={`/about`} />
        </li>
        {!isAuth && (
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
