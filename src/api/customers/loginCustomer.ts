import { type CustomerSignInResult } from '@commercetools/platform-sdk';
import { getPasswordFlowClient } from '../BuildClient';
import { myToken } from '../tokenCache';

export async function loginCustomer(email: string, password: string): Promise<CustomerSignInResult> {
  const anonymousCartId = localStorage.getItem('sloth-CartId');
  const anonymousId = localStorage.getItem('sloth-anonymousId');

  myToken.set({
    token: '',
    expirationTime: 0,
    refreshToken: ''
  });
  try {
    const client = getPasswordFlowClient(email, password);
    const response = await client
      .login()
      .post({
        body: {
          email,
          password,
          anonymousCart: anonymousCartId ? { typeId: 'cart', id: anonymousCartId } : undefined,
          anonymousId: anonymousId || undefined,
          anonymousCartSignInMode: 'MergeWithExistingCustomerCart'
        }
      })
      .execute();
    localStorage.setItem('sloth-refreshToken', myToken.get().refreshToken || '');
    localStorage.removeItem('sloth-CartId');
    localStorage.removeItem('sloth-anonymousId');
    return response.body;
  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error;
  }
}
