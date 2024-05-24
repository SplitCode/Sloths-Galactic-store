import { useAppSelector } from '../../../store/hooks';
import { CustomNavLink } from '../../Header/Navigation/NavLink';
import styles from './Home.module.css';

export function Home() {
  const customerName = useAppSelector((state) => state.customer_slice.customerName);
  return (
    <section className={styles.home_page}>
      <h1 className={styles.home_page_title}>Sloth&apos;s galactic store</h1>
      {customerName && (
        <>
          <h2>Привет, {customerName}!</h2>
          <p>Для проверки редиректа Вы можете пройти по ссылкам или перезагрузить страницу</p>
          <ul className={styles.links_list}>
            <li>
              <CustomNavLink text={'Авторизация'} to={'/login'} />
            </li>
            <li>
              <CustomNavLink text={'Регистрация'} to={'/login'} />
            </li>
          </ul>
        </>
      )}
    </section>
  );
}
