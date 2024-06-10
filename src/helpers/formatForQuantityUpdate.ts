import type { Cart, LineItem } from '@commercetools/platform-sdk';
import type { UpdateCartData } from '../api/api.interfaces';

export function formatForQuantityUpdate({
  action,
  cart,
  itemData
}: {
  cart: Cart;
  itemData: LineItem;
  action: 'increment' | 'decrement';
}): UpdateCartData {
  return {
    ID: cart.id,
    version: cart.version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: itemData.id,
        quantity: action === 'increment' ? itemData.quantity + 1 : itemData.quantity - 1
      }
    ]
  };
}
