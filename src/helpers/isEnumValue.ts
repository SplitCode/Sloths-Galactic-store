import { Planets } from '../store/slices/planet-slice';
import { Subcategories } from './translationMapper';

export function isPlanet(value: string): boolean {
  return Object.values(Planets).includes(value as Planets);
}

export function isSubcategory(value: string): boolean {
  return Object.values(Subcategories).includes(value as Subcategories);
}
