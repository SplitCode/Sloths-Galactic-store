import styles from './BurgerButton.module.css';
import type { BurgerButtonProps } from '../../Header.interfaces';

export const BurgerButton = ({ toggleMenuOpen, menuOpen }: BurgerButtonProps) => {
  return (
    <button
      type="button"
      onClick={toggleMenuOpen}
      className={`${styles.burger_button} ${menuOpen ? styles.open : ''}`}
    >
      <span className={styles.line}></span>
    </button>
  );
};
