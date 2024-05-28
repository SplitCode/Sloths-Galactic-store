import styles from './ProfileViewer.module.css';
import avatarSrc from '../../../../assets/img/avatar.svg';
import { Button } from '../../../univComponents/Button/Button';
import type { ProfileComponentsProps } from '../../Main.interfaces';
import editIcon from '../../../../assets/img/edit.svg';

export function ProfileViewer({
  setEditMode,
  customerData,
  shippingAddress,
  billingAddress
}: ProfileComponentsProps) {
  return (
    <>
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
          {customerData.defaultBillingAddressId && <p className={styles.address_label}>Адрес по умолчанию</p>}
        </fieldset>
      </section>
      <Button
        onClick={() => setEditMode((isEditMode) => !isEditMode)}
        classes={[styles.button]}
        type="button"
      >
        <>
          Редактировать <img src={editIcon} alt="edit" className={styles.edit_icon} />
        </>
      </Button>
    </>
  );
}
