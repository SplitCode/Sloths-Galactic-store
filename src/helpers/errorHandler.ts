import type { ErrorResponse } from '@commercetools/platform-sdk';
import { ErrorMessages } from './helpers.interfaces';

function isInErrorMessages(errorCode: string): errorCode is keyof typeof ErrorMessages {
  return errorCode in ErrorMessages;
}

export function errorHandler(error: ErrorResponse): string {
  if (error.statusCode.toString()[0] === '5') {
    return `Ошибка сервера. Код: ${error.statusCode}`;
  }

  if (!error.errors) {
    throw new Error('errors array not found');
  }

  const errorCode = error.errors[0].code as string;
  if (isInErrorMessages(errorCode)) {
    return ErrorMessages[errorCode];
  } else {
    return error.message;
  }
}
