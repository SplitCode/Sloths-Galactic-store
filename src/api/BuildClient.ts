import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions
} from '@commercetools/sdk-client-v2';
import { ApiData } from './apiData';

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: ApiData.AUTH_URL,
  projectKey: ApiData.PROJECT_KEY,
  credentials: {
    clientId: ApiData.CLIENT_ID,
    clientSecret: ApiData.CLIENT_SECRET
  },
  scopes: ApiData.SCOPES.split(' '),
  fetch
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: ApiData.API_URL,
  fetch
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
