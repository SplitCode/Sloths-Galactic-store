import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@commercetools/platform-sdk';
import { ApiData } from '../apiData';
import { Planets } from '../../store/slices/planet-slice';

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
