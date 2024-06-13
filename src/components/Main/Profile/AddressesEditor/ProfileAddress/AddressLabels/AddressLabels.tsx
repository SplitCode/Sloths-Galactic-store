import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';
import { useAppDispatch } from '../../../../../../store/hooks';
import { updateAddress } from '../../../../../../helpers/updateAddress';
import { Hint } from '../../../../../univComponents/Hint/Hint';
import { hints } from '../../../../../../helpers/profileConfig';
import type { AddressFlag, AddressType } from '../../../../Main.interfaces';

export function AddressLabels({ customerData, addressId }: { customerData: Customer; addressId?: string }) {
  const dispatch = useAppDispatch();

  const isShipping = Boolean(
    customerData?.shippingAddressIds && customerData.shippingAddressIds.find((id) => id === addressId)
  );
  const isBilling = Boolean(
    customerData?.billingAddressIds && customerData.billingAddressIds.find((id) => id === addressId)
  );
  const isDefaultShipping = Boolean(addressId && customerData?.defaultShippingAddressId === addressId);
  const isDefaultBilling = Boolean(addressId && customerData?.defaultBillingAddressId === addressId);

  const addressFlags: Record<AddressType, AddressFlag> = {
    shipping: {
      action: isShipping ? 'removeShippingAddressId' : 'addShippingAddressId',
      checked: isShipping,
      styles: [styles.shipping],
      addressId
    },
    billing: {
      action: isBilling ? 'removeBillingAddressId' : 'addBillingAddressId',
      checked: isBilling,
      styles: [styles.billing],
      addressId
    },
    defaultShipping: {
      action: 'setDefaultShippingAddress',
      checked: isDefaultShipping,
      styles: [styles.shipping, styles.default],
      addressId: isDefaultShipping ? undefined : addressId
    },
    defaultBilling: {
      action: 'setDefaultBillingAddress',
      checked: isDefaultBilling,
      styles: [styles.billing, styles.default],
      addressId: isDefaultBilling ? undefined : addressId
    }
  };

  return (
    <div className={styles.label_wrapper}>
      {hints.map((hint) => {
        return (
          <Hint key={hint.text} hint={hint.text}>
            <input
              onClick={() => {
                updateAddress({
                  action: addressFlags[hint.type].action,
                  addressId: addressFlags[hint.type].addressId,
                  version: customerData?.version,
                  customerId: customerData.id,
                  dispatch
                });
              }}
              type="checkbox"
              defaultChecked={addressFlags[hint.type].checked}
              className={`${styles.label} ${addressFlags[hint.type].styles.join(' ')}`}
            />
          </Hint>
        );
      })}
    </div>
  );
}
