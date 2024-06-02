import type { Customer } from '@commercetools/platform-sdk';
import type { UpdatePasswordData } from '../api.interfaces';
import { apiRoot } from '../apiRoot';

export async function updatePassword(customerData: UpdatePasswordData): Promise<Customer> {
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
