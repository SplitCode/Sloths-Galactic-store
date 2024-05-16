import styles from './Navigation.module.css';
import { CustomNavLink } from './NavLink';
import { useAppSelector } from '../../../store/hooks';
import { Logout } from '../../Main/Logout/Logout';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.customer_slice.customerId);

  return (
    <nav>
      <ul className={styles.navigation_list}>
        <li>
          <CustomNavLink text={'Каталог'} to={`/catalog`} />
        </li>
        <li>
          <CustomNavLink text={'О нас'} to={`/about`} />
        </li>
        {!isAuth && (
          <>
            <li>
              <CustomNavLink text={'Авторизация'} to={'/login'} />
            </li>
            <li>
              <CustomNavLink text={'Регистрация'} to={'/register'} />
            </li>
          </>
        )}
        {isAuth && (
          <>
            <li>
              <CustomNavLink text={'Профиль'} to={'/profile'} />
            </li>
            <li>
              <Logout />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
