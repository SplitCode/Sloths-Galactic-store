import type { Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';

export const addItemToCart = async (cartId: string, productId: string, version: number): Promise<Cart> => {
  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity: 1
          }
        ]
      }
    })
    .execute();
  return response.body;
};
