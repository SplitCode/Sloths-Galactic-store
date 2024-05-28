import type { ErrorResponse } from '@commercetools/platform-sdk';
import type { ProfileEditorValues } from '../components/Main/Main.interfaces';

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
  InvalidCurrentPassword = 'Текущий пароль не совпадает'
}

export interface UpdateDataForFormat {
  values: ProfileEditorValues;
  ID: string;
  version: number;
}
