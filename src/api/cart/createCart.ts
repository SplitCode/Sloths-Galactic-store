import type { Cart } from '@commercetools/platform-sdk';
import { getClientFlow } from '../BuildClient';

export async function createCart(): Promise<Cart> {
  try {
    const client = await getClientFlow();
    const cart = (
      await client
        .me()
        .carts()
        .post({ body: { currency: 'RUB' } })
        .execute()
    ).body;
    localStorage.setItem('sloth-CartId', cart.id);
    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
