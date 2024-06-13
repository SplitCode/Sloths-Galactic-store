import { apiRoot } from '../apiRoot';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Product, ProductProjection } from '@commercetools/platform-sdk';
import { getPlanetCatalogId, getSubcategoryId } from '../../helpers/idsMapper';
import type { getProductsRequestProps } from '../../components/Main/Main.interfaces';

export const getProducts = createAsyncThunk<ProductProjection[], getProductsRequestProps>(
  'products/get',
  async ({ planet, subcategory, filter, sortValue, searchQuery }: getProductsRequestProps) => {
    const getSearchedValue = () => {
      const categoryCondition =
        subcategory && planet
          ? `categories.id:subtree("${getSubcategoryId(planet, subcategory)}")`
          : planet
            ? `categories.id:"${getPlanetCatalogId(planet)}"`
            : '';

      const filterCondition = filter ? `variants.attributes.${filter.type}:"${filter.value}"` : '';

      return [categoryCondition, filterCondition].filter(Boolean);
    };

    const queryArguments: {
      filter: string[];
      sort?: string;
      'text.ru'?: string;
      fuzzy?: boolean;
    } = {
      filter: getSearchedValue()
    };

    if (sortValue) {
      queryArguments.sort = sortValue;
    }

    if (searchQuery) {
      queryArguments['text.ru'] = searchQuery.toLowerCase();
      queryArguments.fuzzy = true;
    }

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
