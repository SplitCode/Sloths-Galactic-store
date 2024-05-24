import styles from './Error.module.css';
import { Header } from '../../Header/Header';
import { CustomNavLink } from '../../Header/Navigation/NavLink';
export function ErrorPage() {
  return (
    <>
      <Header />
      <section className={styles.error_page}>
        <CustomNavLink text={'Вернуться на главную страницу'} to={'/'} />
      </section>
    </>
  );
}
