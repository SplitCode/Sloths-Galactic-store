import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@commercetools/platform-sdk';
import type { getProductsRequestProps } from '../../components/Main/Main.interfaces';
import { mapQueryArguments } from '../../helpers/queryArguments';
import type { GetProductsResponse } from '../api.interfaces';

export const getProducts = createAsyncThunk<GetProductsResponse, getProductsRequestProps>(
  'products/get',
  async (requestProps: getProductsRequestProps) => {
    const queryArguments = mapQueryArguments(requestProps);
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: queryArguments
      })
      .execute();
    return {
      products: response.body.results,
      total: response.body.total ?? 0
    };
  }
);

export const getProduct = async (productKey: string): Promise<Product | undefined> => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body;
  } catch (error) {
    console.log(error);
  }
};
