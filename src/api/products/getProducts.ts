import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Planets } from '../../store/slices/planet-slice';
import type { Product } from '@commercetools/platform-sdk';
import { getPlanetCatalogId } from '../../helpers/idsMapper';

export const getPlanetProducts = createAsyncThunk<Product[], Planets>('products/get', async (planet) => {
  const planetId = getPlanetCatalogId(planet);
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

export const getSubcategoryProducts = createAsyncThunk<Product[], string>(
  'subcategoryProducts/get',
  async (subcategory) => {
    try {
      const response = await apiRoot
        .products()
        .get({
          queryArgs: {
            where: [`masterData(current(categories(id="${subcategory}")))`]
          }
        })
        .execute();
      return response.body.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

interface filteredProductsRequestProps {
  filter: string;
  planet: Planets;
}
export const getFilteredProducts = createAsyncThunk<Product[], filteredProductsRequestProps>(
  'filteredProducts/get',
  async (props) => {
    try {
      const planetId = getPlanetCatalogId(props.planet);

      const response = await apiRoot
        .products()
        .get({
          queryArgs: {
            where: [
              `masterData(current(masterVariant(attributes(value="${props.filter}"))))`,
              `masterData(current(categories(id="${planetId}")))`
            ].join(' and ')
          }
        })
        .execute();
      return response.body.results;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
