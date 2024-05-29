import { Planets } from '../store/slices/planet-slice';
import { Subcategories } from '../components/Sidebar/Subcategories/Subcategories';
import { ApiData } from '../api/apiData';

const IDs = {
  [Planets.venus]: {
    [Subcategories.food]: ApiData.VENUS_FOOD_ID,
    [Subcategories.pets]: ApiData.VENUS_PETS_ID,
    [Subcategories.appliances]: ApiData.VENUS_TECHNIC_ID
  },
  [Planets.mars]: {
    [Subcategories.food]: ApiData.MARS_FOOD_ID,
    [Subcategories.pets]: ApiData.MARS_PETS_ID,
    [Subcategories.appliances]: ApiData.MARS_TECHNIC_ID
  },
  [Planets.earth]: {
    [Subcategories.food]: ApiData.EARTH_FOOD_ID,
    [Subcategories.pets]: ApiData.EARTH_PETS_ID,
    [Subcategories.appliances]: ApiData.EARTH_TECHNIC_ID
  }
};

export function getSubcategoryId(planet: Planets, subcategory: Subcategories): string | undefined {
  return IDs[planet]?.[subcategory];
}

const CATALOG_IDS: Record<Planets, string> = {
  [Planets.earth]: ApiData.EARTH_CATALOG_ID,
  [Planets.venus]: ApiData.VENUS_CATALOG_ID,
  [Planets.mars]: ApiData.MARS_CATALOG_ID
};

export function getPlanetCatalogId(planet: Planets): string {
  return CATALOG_IDS[planet];
}
