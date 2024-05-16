import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private token: TokenStore;

  constructor() {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: ''
    };
  }

  public get(): TokenStore {
    return this.token;
  }

  public set(tokenCache: TokenStore): void {
    this.token = tokenCache;
  }
}

export const myToken = new MyTokenCache();
