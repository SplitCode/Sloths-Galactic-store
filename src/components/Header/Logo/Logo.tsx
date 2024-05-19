import { NavLink } from 'react-router-dom';
import logo from '../../../assets/img/logo_white.png';
import styles from './Logo.module.css';
import type { LogoProps } from '../Header.interfaces';

export function Logo({ closeMenu }: LogoProps) {
  return (
    <NavLink to={`/`} onClick={closeMenu} className={styles.logo_link}>
      <img src={logo} alt={'Logo'} className={styles.logo} draggable="false" />
    </NavLink>
  );
}
