import type { Customer } from '@commercetools/platform-sdk';
import type { UpdatePasswordData } from '../api.interfaces';
import { apiRoot } from '../apiRoot';

export async function updatePassword({
  ID,
  version,
  currentPassword,
  newPassword
}: UpdatePasswordData): Promise<Customer> {
  try {
    const customer = (
      await apiRoot
        .customers()
        .password()
        .post({
          body: {
            id: ID,
            version,
            currentPassword,
            newPassword
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
