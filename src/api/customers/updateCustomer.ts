import type { Customer } from '@commercetools/platform-sdk';
import { apiRoot } from '../apiRoot';
import type { UpdateCustomerData, UpdateCustomerPasswordData } from '../api.interfaces';

export async function updateSimpleData(customerData: UpdateCustomerData): Promise<Customer> {
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

export async function updatePassword(customerData: UpdateCustomerPasswordData): Promise<Customer> {
  try {
    const customer = (
      await apiRoot
        .customers()
        .password()
        .post({
          body: {
            id: customerData.ID,
            version: customerData.version,
            currentPassword: customerData.currentPassword,
            newPassword: customerData.newPassword
          }
        })
        .execute()
    ).body;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
