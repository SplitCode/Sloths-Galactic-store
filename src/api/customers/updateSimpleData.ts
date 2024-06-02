import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import type { UpdateSimpleData } from '../api.interfaces';

export async function updateSimpleData(customerData: UpdateSimpleData): Promise<Customer> {
  try {
    const customer = (
      await apiRoot
        .customers()
        .withId({ ID: customerData.ID })
        .post({ body: { actions: customerData.actions, version: customerData.version } })
        .execute()
    ).body;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
