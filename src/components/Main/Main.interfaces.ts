import type { Address, Customer, ProductProjection } from '@commercetools/platform-sdk';
import type { Planets } from '../../store/slices/planet-slice';
import type { Subcategories } from '../Sidebar/Subcategories/Subcategories';

export interface StringObj {
  [key: string]: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

interface BillingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: 'RU' | 'BY';
  isDefault: boolean;
}

interface ShippingAddress extends BillingAddress {
  isSameAddress: boolean;
}

export interface RegisterValues extends LoginValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shipping: ShippingAddress;
  billing: BillingAddress;
}

export interface ProfileEditorValues extends Omit<RegisterValues, 'shipping' | 'password'> {
  shipping: BillingAddress;
}

export interface ProfileComponentsProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  customerData: Customer;
  shippingAddress: Address;
  billingAddress: Address;
}

export interface PasswordEditorValues {
  currentPassword: string;
  newPassword: string;
}

export interface ProductCardProps {
  product: ProductProjection;
}

export interface Filter {
  type: string;
  value: string;
}

export enum SortValues {
  priceUp = 'price asc',
  priceDown = 'price desc',
  alphabet = 'name.ru asc'
}

export interface getProductsRequestProps {
  planet?: Planets;
  subcategory?: Subcategories;
  filter?: Filter;
  sortValue?: SortValues;
}

export interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}
