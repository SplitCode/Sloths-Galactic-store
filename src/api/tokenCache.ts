import type { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  private static instance: MyTokenCache;

  private token: TokenStore;

  private constructor() {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: ''
    };
  }

  public static getInstance(): MyTokenCache {
    if (!MyTokenCache.instance) {
      MyTokenCache.instance = new MyTokenCache();
    }
    return MyTokenCache.instance;
  }

  public get(): TokenStore {
    return this.token;
  }

  public set(tokenCache: TokenStore): void {
    this.token = tokenCache;
  }
}

export const myToken = MyTokenCache.getInstance();
