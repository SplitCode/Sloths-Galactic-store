import { isPlanet, isSubcategory } from './isEnumValue';
import type { Planets } from '../store/slices/planet-slice';
import type { Subcategories } from './translationMapper';

export function getPlanetFromLocation(locationPathname: string) {
  const parts = locationPathname.split('/');
  return parts.find((part) => isPlanet(part)) as Planets;
}

export function getSubcategoryFromLocation(locationPathname: string) {
  const parts = locationPathname.split('/');
  return parts.find((part) => isSubcategory(part)) as Subcategories;
}
