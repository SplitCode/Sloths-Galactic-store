import type { Address, Customer, ProductData } from '@commercetools/platform-sdk';

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
  country: 'Russia' | 'Belarus';
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

export interface ProductCardProps {
  product: ProductData;
}
