import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, ProductProjection } from '@commercetools/platform-sdk';
import type { getProductsRequestProps } from '../../components/Main/Main.interfaces';
import { mapQueryArguments } from '../../helpers/queryArguments';

export const getProducts = createAsyncThunk<ProductProjection[], getProductsRequestProps>(
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
    return response.body.results;
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
