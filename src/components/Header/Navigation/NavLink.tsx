import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import type { CustomNavLinkProps } from '../Header.interfaces';

export function CustomNavLink({ text, to, toggleMenuOpen }: CustomNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? `${styles.active} ${styles.nav_link}` : styles.nav_link)}
      to={to}
      onClick={toggleMenuOpen}
    >
      {text}
    </NavLink>
  );
}
