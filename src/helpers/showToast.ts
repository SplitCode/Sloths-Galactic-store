import { toast } from 'react-toastify';
import type { ToastInfo } from './helpers.interfaces';

export function showToast(toastInfo: ToastInfo) {
  if ('type' in toastInfo) {
    toast[toastInfo.type](toastInfo.text);
  } else {
    toast.promise(toastInfo.promise, {
      pending: toastInfo.pending,
      success: toastInfo.success,
      error: toastInfo.error
    });
  }
}
