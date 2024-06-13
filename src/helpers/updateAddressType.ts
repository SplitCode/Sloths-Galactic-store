import { showToast } from './showToast';
import { updateSimpleData } from '../api/customers/updateSimpleData';
import type { Customer } from '@commercetools/platform-sdk';
import type { AppDispatch } from '../store/store';
import { getCustomer } from '../api/customers/getCustomer';
import { errorHandler } from './errorHandler';
import type { AddressesActions } from './helpers.interfaces';

export function updateAddressType({
  action,
  version,
  addressId,
  customerId,
  dispatch
}: {
  action: AddressesActions;
  version: number;
  addressId?: string;
  customerId: string;
  dispatch: AppDispatch;
}) {
  const customerPromise: Promise<Customer> = updateSimpleData({
    version,
    ID: customerId,
    actions: [
      {
        action,
        addressId
      }
    ]
  });
  showToast({
    promise: customerPromise,
    pending: 'Изменяем...',
    success: 'Изменено!',
    errorHandler: errorHandler
  });
  customerPromise.then(() => {
    dispatch(getCustomer(customerId));
  });
}
