import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import type { CustomerBody } from '../api.interfaces';
import { apiRoot } from '../apiRoot';

export const createCustomer = (body: CustomerBody): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body
    })
    .execute();
};
