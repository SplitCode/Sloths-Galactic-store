import basket from '../../../assets/img/basket.png';
import emptyBasket from '../../../assets/img/emptyBasket.png';
import styles from './BasketIcon.module.css';
import { NavLink } from 'react-router-dom';
export function BasketIcon() {
  // const { basketProducts } = useAppSelector((state) => state.basket_slice);
  // const basketQuantity = basketProducts.length;
  const basketQuantity = 1;
  return (
    <NavLink to={'/basket'} className={styles.basket_link}>
      <img src={basketQuantity ? basket : emptyBasket} alt="basket" className={styles.basket_icon} />
      {basketQuantity && <div className={styles.basket_quantity}>{basketQuantity}</div>}
    </NavLink>
  );
}
