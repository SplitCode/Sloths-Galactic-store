import type {
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerRemoveAddressAction,
  CustomerRemoveBillingAddressIdAction,
  CustomerRemoveShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  ErrorResponse
} from '@commercetools/platform-sdk';
import type { ProfileEditorValues } from '../components/Main/Main.interfaces';
import type { Planets } from '../store/slices/planet-slice';

export interface SimpleToast {
  text: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface PromiseToast {
  promise: Promise<unknown>;
  pending: string;
  success: string;
  errorHandler: (error: ErrorResponse) => string;
}

export type ToastInfo = SimpleToast | PromiseToast;

export enum ErrorMessages {
  DuplicateField = 'Уже есть существующий клиент с указанным адресом электронной почты.',
  InvalidLogin = 'Неверный адрес эл. почты или пароль. Попробуйте снова!',
  InvalidCurrentPassword = 'Текущий пароль не совпадает',
  DiscountCodeNonApplicable = 'Промокод не найден'
}

export interface UpdateDataForFormat {
  values: ProfileEditorValues;
  ID: string;
  version: number;
}

export type AddressesActions =
  | CustomerAddShippingAddressIdAction['action']
  | CustomerRemoveShippingAddressIdAction['action']
  | CustomerAddBillingAddressIdAction['action']
  | CustomerRemoveBillingAddressIdAction['action']
  | CustomerSetDefaultShippingAddressAction['action']
  | CustomerSetDefaultBillingAddressAction['action']
  | CustomerRemoveAddressAction['action'];

export interface PlanetConfig {
  value: Planets;
  label: string;
  className: string;
}
