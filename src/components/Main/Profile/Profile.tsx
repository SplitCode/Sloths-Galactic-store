import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCustomer } from '../../../api/customers/getCustomer';
import type { Address } from '@commercetools/platform-sdk';
import { Loader } from '../Loader/Loader';
import styles from './Profile.module.css';
import avatarSrc from '../../../assets/img/avatar.svg';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';

export function Profile() {
  const dispatch = useAppDispatch();
  const { isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );
  const customerId: string | null = useAppSelector((state) => state.customer_slice.customerId);

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomer(customerId));
    }
  }, [customerId, dispatch]);

  const shippingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.shippingAddressIds) return address.id === customerData.shippingAddressIds[0];
    return false;
  });
  const billingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.billingAddressIds) return address.id === customerData.billingAddressIds[0];
    return false;
  });

  return isCustomerLoading ? (
    <Loader />
  ) : customerData && shippingAddress && billingAddress ? (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>
        <img src={avatarSrc} alt="avatar" className={styles.avatar} />
        <section className={styles.personal_data}>
          <p>Имя: {customerData.firstName}</p>
          <p>Фамилия: {customerData.lastName}</p>
          <p>Email: {customerData.email}</p>
          <p>Дата рождения: {customerData.dateOfBirth}</p>
        </section>

        <section className={styles.addresses_data}>
          <fieldset className={styles.address_data}>
            <legend className={styles.legend}>Адрес доставки</legend>
            <p>Страна: {shippingAddress.country === 'RU' ? 'Россия' : 'Беларусь'}</p>
            <p>Город: {shippingAddress.city}</p>
            <p>Улица: {shippingAddress.streetName}</p>
            <p>Почтовый индекс: {shippingAddress.postalCode}</p>
            {customerData.defaultShippingAddressId && (
              <p className={styles.address_label}>Адрес по умолчанию</p>
            )}
          </fieldset>

          <fieldset className={styles.address_data}>
            <legend className={styles.legend}>Адрес выставления счёта</legend>
            <p>Страна: {billingAddress.country === 'RU' ? 'Россия' : 'Беларусь'}</p>
            <p>Город: {billingAddress.city}</p>
            <p>Улица: {billingAddress.streetName}</p>
            <p>Почтовый индекс: {billingAddress.postalCode}</p>
            {customerData.defaultBillingAddressId && (
              <p className={styles.address_label}>Адрес по умолчанию</p>
            )}
          </fieldset>
        </section>
      </div>
    </div>
  ) : (
    <p>Упс... Что-то пошло не так: {errorMessage}</p>
  );
}
