import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import type { UpdateSimpleData } from '../api.interfaces';

export async function updateSimpleData({ ID, actions, version }: UpdateSimpleData): Promise<Customer> {
  try {
    const customer = (await apiRoot.customers().withId({ ID }).post({ body: { actions, version } }).execute())
      .body;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
