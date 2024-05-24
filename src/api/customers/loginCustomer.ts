import { type CustomerSignInResult } from '@commercetools/platform-sdk';
import { getPasswordFlowClient } from '../BuildClient';
import { myToken } from '../tokenCache';

export async function loginCustomer(email: string, password: string): Promise<CustomerSignInResult> {
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
          password
        }
      })
      .execute();
    localStorage.setItem('sloth-refreshToken', myToken.get().refreshToken || '');
    return response.body;
  } catch (error) {
    console.error('Error occurred during login:', error);
    throw error;
  }
}
