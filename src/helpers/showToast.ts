import { toast } from 'react-toastify';
import type { ToastInfo } from './helpers.interfaces';
import type { ApiError } from '../api/api.interfaces';

export function showToast(toastInfo: ToastInfo) {
  if ('type' in toastInfo) {
    toast[toastInfo.type](toastInfo.text);
  } else {
    toast.promise(toastInfo.promise, {
      pending: {
        render() {
          return toastInfo.pending;
        }
      },
      success: {
        render() {
          return toastInfo.success;
        }
      },
      error: {
        render({ data }: { data: ApiError }) {
          return toastInfo.errorHandler(data.body);
        }
      }
    });
  }
}
