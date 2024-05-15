import {
  createApiBuilderFromCtpClient,
  type ClientResponse,
  type CustomerSignInResult
} from '@commercetools/platform-sdk';
import type { Login } from '../api.interfaces';
import { getPasswordFlowClient } from '../BuildClient';
import { ApiData } from '../apiData';

export const loginCustomer = async ({
  email,
  password
}: Login): Promise<ClientResponse<CustomerSignInResult>> => {
  const client = getPasswordFlowClient(email, password);
  const ApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: ApiData.PROJECT_KEY
  });
  return await ApiRoot.login()
    .post({
      body: {
        email,
        password
      }
    })
    .execute();
};
