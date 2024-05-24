import styles from './BurgerButton.module.css';
import openMenu from './../../../../assets/img/openMenu.svg';
import closeMenu from './../../../../assets/img/closeMenu.svg';
import type { BurgerButtonProps } from '../../Header.interfaces';

export const BurgerButton = ({ toggleMenuOpen, menuOpen }: BurgerButtonProps) => {
  return (
    <button type="button" onClick={toggleMenuOpen} className={styles.burger_button}>
      <img src={menuOpen ? openMenu : closeMenu} alt="burger menu" />
    </button>
  );
};
