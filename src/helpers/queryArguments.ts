import type { Planets } from '../store/slices/planet-slice';
import type { Subcategories } from './translationMapper';
import { getPlanetCatalogId, getSubcategoryId } from './idsMapper';
import type { Filter, getProductsRequestProps } from '../components/Main/Main.interfaces';

const getCategoryCondition = (planet?: Planets, subcategory?: Subcategories): string => {
  if (subcategory && planet) {
    return `categories.id:subtree("${getSubcategoryId(planet, subcategory)}")`;
  }
  if (planet) {
    return `categories.id:"${getPlanetCatalogId(planet)}"`;
  }
  return '';
};

const getFilterCondition = (filter?: Filter): string => {
  return filter ? `variants.attributes.${filter.type}:"${filter.value}"` : '';
};

const getSearchConditions = (planet?: Planets, subcategory?: Subcategories, filter?: Filter): string[] => {
  const categoryCondition = getCategoryCondition(planet, subcategory);
  const filterCondition = getFilterCondition(filter);
  return [categoryCondition, filterCondition].filter(Boolean);
};

export const mapQueryArguments = ({
  planet,
  subcategory,
  filter,
  sortValue,
  searchQuery,
  limit,
  offset
}: getProductsRequestProps) => {
  return {
    filter: getSearchConditions(planet, subcategory, filter),
    ...(sortValue && { sort: sortValue }),
    ...(searchQuery && {
      'text.ru': searchQuery.toLowerCase(),
      fuzzy: true
    }),
    ...(limit && { limit }),
    ...(offset && { offset })
  };
};
