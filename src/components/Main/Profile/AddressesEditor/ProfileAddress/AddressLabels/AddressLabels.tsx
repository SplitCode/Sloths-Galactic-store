import type { Customer } from '@commercetools/platform-sdk';
import styles from './AddressLabels.module.css';
import { useAppDispatch } from '../../../../../../store/hooks';
import { updateAddressType } from '../../../../../../helpers/updateAddressType';
import { Hint } from '../../../../../univComponents/Hint/Hint';

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

  return (
    <div className={styles.label_wrapper}>
      <Hint hint="Адрес доставки">
        <input
          onClick={() => {
            updateAddressType({
              action: isShipping ? 'removeShippingAddressId' : 'addShippingAddressId',
              addressId: addressId,
              version: customerData?.version,
              customerId: customerData.id,
              dispatch
            });
          }}
          type="checkbox"
          defaultChecked={isShipping}
          className={`${styles.label} ${styles.shipping}`}
        />
      </Hint>

      <Hint hint="Адрес доставки по умолчанию">
        <input
          onClick={() => {
            updateAddressType({
              action: 'setDefaultShippingAddress',
              addressId: isDefaultShipping ? undefined : addressId,
              version: customerData?.version,
              customerId: customerData.id,
              dispatch
            });
          }}
          type="checkbox"
          defaultChecked={isDefaultShipping}
          className={`${styles.label} ${styles.default} ${styles.shipping}`}
        />
      </Hint>

      <Hint hint="Адрес выставления счёта">
        <input
          onClick={() => {
            updateAddressType({
              action: isBilling ? 'removeBillingAddressId' : 'addBillingAddressId',
              addressId: addressId,
              version: customerData?.version,
              customerId: customerData.id,
              dispatch
            });
          }}
          type="checkbox"
          defaultChecked={isBilling}
          className={`${styles.label} ${styles.billing}`}
        />
      </Hint>

      <Hint hint="Адрес выставления счёта по умолчанию">
        <input
          onClick={() => {
            updateAddressType({
              action: 'setDefaultBillingAddress',
              addressId: isDefaultBilling ? undefined : addressId,
              version: customerData?.version,
              customerId: customerData.id,
              dispatch
            });
          }}
          type="checkbox"
          defaultChecked={isDefaultBilling}
          className={`${styles.label} ${styles.default} ${styles.billing}`}
        />
      </Hint>
    </div>
  );
}
