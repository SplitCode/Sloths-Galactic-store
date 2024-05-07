import { ctpClient } from './BuildClient';
import { ApiData } from './apiData';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: ApiData.PROJECT_KEY
});

export const getProducts = () => {
  return apiRoot.products().get().execute();
};
