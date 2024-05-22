import type { ErrorResponse } from '@commercetools/platform-sdk';
import { ErrorMessages } from './helpers.interfaces';

export function errorHandler(error: ErrorResponse): string {
  if (error.statusCode.toString()[0] === '5') {
    return `Ошибка сервера. Код: ${error.statusCode}`;
  }

  if (!error.errors) {
    throw new Error('errors array not found');
  }

  const errorCode = error.errors[0].code as string;
  if (errorCode === 'invalid_customer_account_credentials') {
    return ErrorMessages.invalidLogin;
  } else if (errorCode === 'DuplicateField') {
    return ErrorMessages.duplicateField;
  } else {
    return error.message;
  }
}
