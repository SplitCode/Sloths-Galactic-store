import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'sloths_rss_ecommerce'
});

export const getProject = () => {
  return apiRoot.get().execute();
};

getProject().then(console.log).catch(console.error);
