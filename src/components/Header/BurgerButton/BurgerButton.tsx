import styles from './BurgerButton.module.css';
import type { BurgerButtonProps } from '../Header.interfaces';
import { useAppSelector } from '../../../store/hooks';

export const BurgerButton = ({ toggleMenuOpen, menuOpen }: BurgerButtonProps) => {
  const cart = useAppSelector((state) => state.cart_slice.cart);

  return (
    <button
      type="button"
      onClick={toggleMenuOpen}
      className={`${styles.burger_button} ${menuOpen ? styles.open : ''}`}
    >
      <div className={`${styles.line} ${cart?.totalLineItemQuantity ? styles.notification : ''}`} />
      <div className={styles.line} />
      <div className={styles.line} />
    </button>
  );
};
