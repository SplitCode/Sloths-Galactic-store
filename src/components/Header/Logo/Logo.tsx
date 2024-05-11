import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo_white.png';
import styles from './Logo.module.css';

function Logo() {
  return (
    <NavLink to={`/`}>
      <img src={logo} alt={'Logo'} className={styles.logo} />
    </NavLink>
  );
}
export default Logo;
