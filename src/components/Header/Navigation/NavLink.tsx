import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
function CustomNavLink({
  text,
  to
}: {
  text: string;
  to: '/login' | '/register' | '/catalog' | '/about' | '/';
}) {
  return (
    <NavLink className={({ isActive }) => (isActive ? styles.active : styles.nav_link)} to={to}>
      {text}
    </NavLink>
  );
}

export default CustomNavLink;
