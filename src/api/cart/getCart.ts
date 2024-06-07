import type { ClientResponse, Cart } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';

export const getCart = async (customerId: string): Promise<ClientResponse<Cart>> => {
  return await apiRoot.carts().withCustomerId({ customerId }).get().execute();
};
