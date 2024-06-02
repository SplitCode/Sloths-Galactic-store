import { Planets } from '../store/slices/planet-slice';

export enum Subcategories {
  food = 'food',
  pets = 'pets',
  appliances = 'appliances'
}

const translations = {
  [Subcategories.food]: 'еда',
  [Subcategories.pets]: 'животные',
  [Subcategories.appliances]: 'техника',
  [Planets.earth]: 'Земля',
  [Planets.mars]: 'Марс',
  [Planets.venus]: 'Венера'
};

export function getTranslation(valueForTranslation: Planets | Subcategories): string {
  return translations[valueForTranslation].toUpperCase();
}
