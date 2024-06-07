import type { Cart } from '@commercetools/platform-sdk';
import { getClientFlow } from '../BuildClient';

export const createCart = async (): Promise<Cart> => {
  const client = await getClientFlow();
  const response = await client
    .me()
    .carts()
    .post({
      body: {
        currency: 'RUB'
      }
    })
    .execute();
  return response.body;
};
