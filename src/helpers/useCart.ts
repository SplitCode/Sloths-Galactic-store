import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCart } from '../api/cart/updateCart';
import { createCart } from '../api/cart/createCart';

export function useCart() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart_slice);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const addToCart = async (productId: string) => {
    setIsCartLoading(true);
    try {
      if (!cart) {
        const newCart = await createCart();
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: newCart.version,
            ID: newCart.id
          })
        );
      } else {
        await dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: cart.version,
            ID: cart.id
          })
        );
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  return {
    cart,
    isCartLoading,
    addToCart
  };
}
