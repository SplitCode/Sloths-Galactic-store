import { useState } from 'react';
import { Button } from '../../../../univComponents/Button/Button';
import { Input } from '../../../../univComponents/CustomForm/Input/Input';
import { CountrySelect } from '../../../../univComponents/CustomForm/RegisterAddress/CountrySelect/CountrySelect';
import deleteIcon from '../../../../../assets/img/delete.svg';
import styles from './ProfileAddress.module.css';
import { useAppDispatch } from '../../../../../store/hooks';
import { AddressLabels } from './AddressLabels/AddressLabels';
import type { ProfileAddressProps } from '../../../Main.interfaces';
import { useFormikContext } from 'formik';
import { updateAddress } from '../../../../../helpers/updateAddress';

export function ProfileAddress({
  index,
  addressId,
  customerData,
  isNew,
  setAddingAddress
}: ProfileAddressProps) {
  const dispatch = useAppDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const { resetForm } = useFormikContext();
  const isDisabled: boolean = isNew ? false : !isEditMode;

  return (
    <fieldset className={styles.address}>
      <legend className={styles.legend}>{isNew ? 'Новый адрес' : `Адрес ${(index || 0) + 1}`}</legend>

      {!isNew && customerData && (
        <>
          <AddressLabels customerData={customerData} addressId={addressId} />
          <button
            type="button"
            className={styles.delete_btn}
            onClick={() => {
              updateAddress({
                action: 'removeAddress',
                addressId,
                version: customerData.version,
                customerId: customerData.id,
                dispatch
              });
            }}
            title="Удалить адрес"
          >
            <img className={styles.delete_icon} src={deleteIcon} alt="delete" />
          </button>
        </>
      )}

      <CountrySelect disabled={isDisabled} name="country"></CountrySelect>
      <Input disabled={isDisabled} name="city" type="text" placeholder="Город"></Input>
      <Input disabled={isDisabled} name="street" type="text" placeholder="Улица"></Input>
      <Input disabled={isDisabled} name="postalCode" type="text" placeholder="Почтовый индекс"></Input>

      {isEditMode || isNew ? (
        <div className={styles.buttons}>
          <Button classes={[styles.button, styles.save_btn]} minimal={true} type="submit">
            {isNew ? 'Добавить' : 'Сохранить'}
          </Button>
          <Button
            onClick={() => {
              if (setAddingAddress) {
                setAddingAddress(false);
              } else {
                resetForm();
                setEditMode(false);
              }
            }}
            classes={[styles.button]}
            minimal={true}
            type="button"
          >
            Отмена
          </Button>
        </div>
      ) : (
        <Button onClick={() => setEditMode(true)} type="button">
          Изменить
        </Button>
      )}
    </fieldset>
  );
}
