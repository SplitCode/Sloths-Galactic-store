import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateCart } from '../api/cart/updateCart';
import { createCart } from '../api/cart/createCart';
import { formatForQuantityUpdate } from './formatForQuantityUpdate';
import type { LineItem } from '@commercetools/platform-sdk';
import { showToast } from './showToast';
import { errorHandler } from './errorHandler';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart_slice);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const updateQuantity = async (actionName: 'increment' | 'decrement' | 'remove', itemData: LineItem) => {
    if (!cart) return;
    setIsCartLoading(true);
    try {
      const updatePromise = dispatch(updateCart(formatForQuantityUpdate({ actionName, cart, itemData })));
      showToast({
        promise: updatePromise,
        pending: 'В процессе...',
        success: 'Сделано!',
        errorHandler
      });
      await updatePromise;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsCartLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    setIsCartLoading(true);
    try {
      let updatePromise;
      if (!cart) {
        const newCart = await createCart();
        updatePromise = dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: newCart.version,
            ID: newCart.id
          })
        );
      } else {
        updatePromise = dispatch(
          updateCart({
            actions: [{ action: 'addLineItem', quantity: 1, productId }],
            version: cart.version,
            ID: cart.id
          })
        );
      }
      showToast({
        promise: updatePromise,
        pending: 'В процессе...',
        success: 'Сделано!',
        errorHandler
      });
      await updatePromise;
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsCartLoading(false);
    }
  };

  return { cart, isCartLoading, updateQuantity, addToCart };
};
