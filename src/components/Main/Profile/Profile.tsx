import { getCustomer } from '../../../api/customers/getCustomer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';
import styles from './Profile.module.css';
import { PersonalEditor } from './PersonalEditor/PersonalEditor';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { PasswordEditor } from './PasswordEditor/PasswordEditor';
import { AddressesEditor } from './AddressesEditor/AddressesEditor';
import editIcon from '../../../assets/img/edit.svg';
import passwordIcon from '../../../assets/img/change_password.svg';
import addressIcon from '../../../assets/img/address.svg';
import { Button } from '../../univComponents/Button/Button';

export function Profile() {
  const dispatch = useAppDispatch();
  const customerId: string | null = useAppSelector((state) => state.customer_slice.customerId);
  const { isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomer(customerId));
    }
  }, [customerId, dispatch]);

  const [editModes, setEditMode] = useState({
    isPersonalEdit: false,
    isAddressesEdit: false,
    isPasswordEdit: false
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
