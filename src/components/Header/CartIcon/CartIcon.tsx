import cartIcon from '../../../assets/img/cartIcon.png';
import emptyCartIcon from '../../../assets/img/emptyCartIcon.png';
import styles from './CartIcon.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { CustomNavLinkProps } from '../Header.interfaces';
import { useEffect, useMemo } from 'react';
import { getCart } from '../../../api/cart/getCart';
import { MiniLoader } from '../../Main/Loader/Loader';

export function CartIcon({ toggleMenuOpen }: CustomNavLinkProps) {
  const { cart, isLoading } = useAppSelector((state) => state.cart_slice);
  const customerId = useAppSelector((state) => state.customer_slice.customerId);
  const dispatch = useAppDispatch();

  const totalLineItemQuantity = useMemo(() => {
    return cart ? cart.totalLineItemQuantity : '';
  }, [cart]);

  useEffect(() => {
    if (customerId && !cart) {
      dispatch(getCart(customerId));
    }
  }, [customerId, cart, dispatch]);

  if (isLoading) return <MiniLoader />;

  return (
    <NavLink to={'/cart'} className={styles.cart_link}>
      <img
        src={totalLineItemQuantity ? cartIcon : emptyCartIcon}
        alt="cart icon"
        className={styles.cart_icon}
        onClick={toggleMenuOpen}
      />
      {totalLineItemQuantity && <div className={styles.cart_quantity}>{totalLineItemQuantity}</div>}
    </NavLink>
  );
}
