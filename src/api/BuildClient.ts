// import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

// const projectKey = '{projectKey}';
// const scopes = ['{scope}'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'sloths_rss_ecommerce',
  credentials: {
    clientId: 'PE4EPZ50GkViS5uM7JVSdwbS',
    clientSecret: 'NSX6uFd9moie4Yr6Wd0q9pO5767SuDit'
  },
  scopes: [
    'manage_my_profile:sloths_rss_ecommerce manage_my_quote_requests:sloths_rss_ecommerce manage_my_business_units:sloths_rss_ecommerce manage_my_shopping_lists:sloths_rss_ecommerce manage_my_orders:sloths_rss_ecommerce view_published_products:sloths_rss_ecommerce manage_my_payments:sloths_rss_ecommerce view_products:sloths_rss_ecommerce create_anonymous_token:sloths_rss_ecommerce manage_my_quotes:sloths_rss_ecommerce view_categories:sloths_rss_ecommerce'
  ],
  fetch
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  //   .withProjectKey('sloths_rss_ecommerce') // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
