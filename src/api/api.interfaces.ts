import type {
  CartUpdateAction,
  CustomerUpdateAction,
  ErrorResponse,
  ProductProjection
} from '@commercetools/platform-sdk';

export interface Login {
  email: string;
  password: string;
}

export interface CustomerAddress {
  country: 'RU' | 'BY';
  city: string;
  streetName: string;
  postalCode: string;
}

export interface CustomerBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomerAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface ApiError {
  body: ErrorResponse;
  statusCode: number;
  message: string;
}

interface UpdateData<T> {
  ID: string;
  version: number;
  actions: T[];
}

export type UpdateSimpleData = UpdateData<CustomerUpdateAction>;

export type UpdateCartData = UpdateData<CartUpdateAction>;

export interface UpdatePasswordData extends Omit<UpdateSimpleData, 'actions'> {
  currentPassword: string;
  newPassword: string;
}

export interface AddCartInfo {
  cartId: string;
  productId: string;
  version: number;
}

export interface GetProductsResponse {
  products: ProductProjection[];
  total: number;
}
