import { NavLink } from 'react-router-dom';
import styles from './CustomLink.module.css';

export function CustomLink({
  children,
  text,
  to
}: {
  children: string;
  text: string;
  to: '/login' | '/register';
}) {
  return (
    <p className={styles.linkWrapper}>
      {text}&nbsp;
      <NavLink className={styles.link} to={to}>
        {children}
      </NavLink>
    </p>
  );
}
