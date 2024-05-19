import styles from './Header.module.css';
import { Navigation } from './Navigation/Navigation';
import { Logo } from './Logo/Logo';
import { BurgerButton } from './BurgerMenu/BurgerButton/BurgerButton';
import { useMenuToggle } from '../../helpers/useMenuToggle';

export function Header() {
  const { menuOpen, toggleMenuOpen, closeMenu } = useMenuToggle();

  return (
    <header className={styles.header}>
      <Logo closeMenu={closeMenu} />
      <h2 className={styles.header_title}>Sloth&apos;s galactic store</h2>
      <Navigation menuOpen={menuOpen} toggleMenuOpen={toggleMenuOpen} />
      <BurgerButton toggleMenuOpen={toggleMenuOpen} menuOpen={menuOpen} />
    </header>
  );
}
