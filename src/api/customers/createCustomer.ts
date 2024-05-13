import type { CustomerBody } from '../api.interfaces';
import { apiRoot } from '../apiRoot';

export const createCustomer = (body: CustomerBody) => {
  return apiRoot
    .customers()
    .post({
      body
    })
    .execute();
};
