import { toast } from 'react-toastify';

export function showToast(
  text: string,
  toastInfo:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | { pending: string; success: string; error: string; promise: Promise<unknown> }
) {
  if (typeof toastInfo === 'object') {
    toast.promise(toastInfo.promise, {
      pending: toastInfo.pending,
      success: toastInfo.success,
      error: toastInfo.error
    });
  } else toast[toastInfo](text);
}
