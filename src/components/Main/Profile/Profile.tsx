import type { Address } from '@commercetools/platform-sdk';
import { useAppSelector } from '../../../store/hooks';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';
import styles from './Profile.module.css';
import { PersonalEditor } from './PersonalEditor/PersonalEditor';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { PasswordEditor } from './PasswordEditor/PasswordEditor';
import { AddressesEditor } from './AddressesEditor/AddressesEditor';
import editIcon from '../../../assets/img/edit.svg';
import passwordIcon from '../../../assets/img/change_password.svg';
import addressIcon from '../../../assets/img/address.svg';
import { Button } from '../../univComponents/Button/Button';

export function Profile() {
  const { customerId, isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );

  const shippingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.shippingAddressIds) return address.id === customerData.shippingAddressIds[0];
    return false;
  });
  const billingAddress = customerData?.addresses.find((address: Address) => {
    if (customerData.billingAddressIds) return address.id === customerData.billingAddressIds[0];
    return false;
  });

  if (isCustomerLoading) return <Loader />;
  if (errorMessage) return <p>Упс... Что-то пошло не так: {errorMessage}</p>;

  return customerData && customerId ? (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>

        {editModes.isPersonalEdit ? (
          <PersonalEditor setEditMode={setEditMode} customerData={customerData} />
        ) : editModes.isAddressesEdit ? (
          <AddressesEditor setEditMode={setEditMode} customerData={customerData} />
        ) : editModes.isPasswordEdit ? (
          <PasswordEditor setEditMode={setEditMode} customerData={customerData} />
        ) : (
          <>
            <ProfileViewer setEditMode={setEditMode} customerData={customerData} />
            <Button
              onClick={() =>
                setEditMode((editModes) => {
                  return {
                    ...editModes,
                    isPersonalEdit: true
                  };
                })
              }
              classes={[styles.button]}
              type="button"
            >
              <>
                Редактировать <img src={editIcon} alt="personal" className={styles.icon} />
              </>
            </Button>

            <Button
              classes={[styles.button]}
              type="button"
              onClick={() =>
                setEditMode((editModes) => {
                  return {
                    ...editModes,
                    isPasswordEdit: true
                  };
                })
              }
            >
              <>
                Изменить пароль
                <img className={styles.icon} src={passwordIcon} alt="password" />
              </>
            </Button>

            <Button
              classes={[styles.button]}
              type="button"
              onClick={() =>
                setEditMode((editModes) => {
                  return {
                    ...editModes,
                    isAddressesEdit: true
                  };
                })
              }
            >
              <>
                Управление адресами
                <img className={styles.icon} src={addressIcon} alt="address" />
              </>
            </Button>
          </>
        )}
      </div>
    </div>
  ) : (
    <p>Не найдены данные пользователя</p>
  );
}
