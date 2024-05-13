import styles from './Header.module.css';
import { Navigation } from './Navigation/Navigation';
import { Logo } from './Logo/Logo';

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
    </header>
  );
}
