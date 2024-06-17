import cartIcon from '../../../assets/img/cartIcon.png';
import emptyCartIcon from '../../../assets/img/emptyCartIcon.png';
import styles from './CartIcon.module.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { CustomNavLinkProps } from '../Header.interfaces';
import { useEffect, useMemo } from 'react';
import { getCart, getCartById } from '../../../api/cart/getCart';
import { MiniLoader } from '../../Main/Loader/Loader';

export function CartIcon({ toggleMenuOpen }: CustomNavLinkProps) {
  const { cart, isLoading } = useAppSelector((state) => state.cart_slice);
  const customerId = useAppSelector((state) => state.customer_slice.customerId);
  const cartId = localStorage.getItem('sloth-CartId');
  const dispatch = useAppDispatch();

  const totalLineItemQuantity = useMemo(() => {
    return cart ? cart.totalLineItemQuantity : '';
  }, [cart]);

  const largeNumber = 99;

  useEffect(() => {
    if (!cart) {
      if (customerId) {
        dispatch(getCart(customerId));
      } else if (cartId) {
        dispatch(getCartById(cartId));
      }
    }
  }, [customerId, cartId, cart, dispatch]);

  if (isLoading) return <MiniLoader />;

  return (
    <NavLink to={'/cart'} className={styles.cart_link}>
      <img
        src={totalLineItemQuantity ? cartIcon : emptyCartIcon}
        alt="cart icon"
        className={styles.cart_icon}
        onClick={toggleMenuOpen}
      />
      {totalLineItemQuantity && (
        <div
          className={
            totalLineItemQuantity > largeNumber
              ? styles.cart_quantity_big + ' ' + styles.cart_quantity
              : styles.cart_quantity
          }
        >
          {totalLineItemQuantity}
        </div>
      )}
    </NavLink>
  );
}
