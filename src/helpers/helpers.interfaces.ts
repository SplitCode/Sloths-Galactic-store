import type { ErrorResponse } from '@commercetools/platform-sdk';

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
