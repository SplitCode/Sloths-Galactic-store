import { ctpClient } from './BuildClient';
import { ApiData } from './apiData';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: ApiData.PROJECT_KEY
});
