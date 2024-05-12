import styles from './Error.module.css';
import Header from '../../Header/Header';
import CustomNavLink from '../../Header/Navigation/NavLink';
function ErrorPage() {
  return (
    <>
      <Header />
      <section className={styles.error_page}>
        <CustomNavLink text={'Back to your planet'} to={'/'} />
      </section>
    </>
  );
}
export default ErrorPage;
