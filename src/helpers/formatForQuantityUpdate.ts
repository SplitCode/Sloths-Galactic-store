import type { Cart, LineItem } from '@commercetools/platform-sdk';
import type { UpdateCartData } from '../api/api.interfaces';

export function formatForQuantityUpdate({
  actionName,
  cart,
  itemData
}: {
  cart: Cart;
  itemData: LineItem;
  actionName: 'increment' | 'decrement' | 'remove';
}): UpdateCartData {
  const quantityValues = {
    increment: {
      quantity: itemData.quantity + 1
    },
    decrement: {
      quantity: itemData.quantity - 1
    },
    remove: {
      quantity: 0
    }
  };

  return {
    ID: cart.id,
    version: cart.version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: itemData.id,
        quantity: quantityValues[actionName].quantity
      }
    ]
  };
}
