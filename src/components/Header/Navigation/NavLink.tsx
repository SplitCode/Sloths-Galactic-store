import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
export function CustomNavLink({
  text,
  to
}: {
  text: string;
  to: '/login' | '/register' | '/catalog' | '/about' | '/' | '/profile';
}) {
  return (
    <NavLink className={({ isActive }) => (isActive ? styles.active : styles.nav_link)} to={to}>
      {text}
    </NavLink>
  );
}
