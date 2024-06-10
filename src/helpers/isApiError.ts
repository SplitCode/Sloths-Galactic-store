import type { ErrorResponse } from 'react-router-dom';
import type { ApiError } from '../api/api.interfaces';

function isErrorResponse(errorBody: unknown): errorBody is ErrorResponse {
  if (errorBody instanceof Object && 'statusCode' in errorBody && 'message' in errorBody) return true;
  return false;
}

export function isApiError(error: unknown): error is ApiError {
  if (error instanceof Object && 'body' in error && isErrorResponse(error.body)) {
    return true;
  }
  return false;
}
