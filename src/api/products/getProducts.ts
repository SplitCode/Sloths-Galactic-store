import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiData } from '../apiData';
import { Planets } from '../../store/slices/planet-slice';
import type { Product } from '@commercetools/platform-sdk';

export const getProducts = createAsyncThunk<Product[], Planets>('products/get', async (planet) => {
  const planetId =
    planet === Planets.earth
      ? ApiData.EARTH_CATALOG_ID
      : planet === Planets.mars
        ? ApiData.MARS_CATALOG_ID
        : ApiData.VENUS_CATALOG_ID;
  try {
    const response = await apiRoot
      .products()
      .get({
        queryArgs: {
          where: [`masterData(current(categories(id="${planetId}")))`]
        }
      })
      .execute();
    return response.body.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getProduct = async (productKey: string): Promise<Product | undefined> => {
  try {
    const response = await apiRoot.products().withKey({ key: productKey }).get().execute();
    return response.body;
  } catch (error) {
    console.log(error);
  }
};
