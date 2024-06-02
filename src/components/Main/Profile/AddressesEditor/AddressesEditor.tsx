import { Form, Formik } from 'formik';
import type { BillingAddress, EditorProps } from '../../Main.interfaces';
import { Button } from '../../../univComponents/Button/Button';
import { ProfileAddress } from './ProfileAddress/ProfileAddress';
import { EditorTitle } from '../EditorTitle/EditorTitle';
import { AddressSchema } from '../../validationSchemes';
import searchIcon from '../../../../assets/img/search.svg';
import styles from './AddressesEditor.module.css';
import { useState } from 'react';
import type { Customer } from '@commercetools/platform-sdk';
import { updateSimpleData } from '../../../../api/customers/updateSimpleData';
import { showToast } from '../../../../helpers/showToast';
import { errorHandler } from '../../../../helpers/errorHandler';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { useAppDispatch } from '../../../../store/hooks';

export function AddressesEditor({ customerData, setEditMode }: EditorProps) {
  const dispatch = useAppDispatch();
  const addresses = customerData.addresses;
  const [isAddingAddress, setAddingAddress] = useState(false);

  return (
    <>
      <EditorTitle>Управление адресами</EditorTitle>
      <Button
        type="button"
        onClick={() => {
          setEditMode((editModes) => {
            return {
              ...editModes,
              isAddressesEdit: false
            };
          });
        }}
      >
        Вернуться назад
      </Button>

      <Button onClick={() => setAddingAddress(true)} classes={[styles.add_address_btn]} type="button">
        Добавить адрес
      </Button>
      {isAddingAddress && (
        <Formik
          initialValues={{
            country: 'RU',
            city: '',
            street: '',
            postalCode: ''
          }}
          onSubmit={(values: Omit<BillingAddress, 'isDefault'>) => {
            const customerPromise: Promise<Customer> = updateSimpleData({
              version: customerData.version,
              ID: customerData.id,
              actions: [
                {
                  action: 'addAddress',
                  address: {
                    country: values.country,
                    city: values.city,
                    streetName: values.street,
                    postalCode: values.postalCode
                  }
                }
              ]
            });
            showToast({
              promise: customerPromise,
              pending: 'Добавляем...',
              success: 'Адрес добавлен!',
              errorHandler: errorHandler
            });
            customerPromise.then(() => {
              dispatch(getCustomer(customerData.id));
            });
          }}
          validationSchema={AddressSchema}
        >
          <Form className={styles.address_form}>
            <ProfileAddress isNew={true} setAddingAddress={setAddingAddress} />
          </Form>
        </Formik>
      )}

      {!addresses.length ? (
        <>
          <p className={styles.empty_info}>
            Если вы не укажете адрес, Ваши посылки затеряются в черной дыре!
          </p>
          <img className={styles.search_icon} src={searchIcon} alt="empty"></img>
        </>
      ) : (
        addresses.map((address, index) => {
          if (address.country !== 'RU' && address.country !== 'BY') throw new Error('wrong country name');
          if (!address.id) throw new Error('id is undefined');

          const initialValues: Omit<BillingAddress, 'isDefault'> = {
            country: address.country || '',
            city: address.city || '',
            street: address.streetName || '',
            postalCode: address.postalCode || ''
          };

          return (
            <Formik
              key={address.id}
              initialValues={initialValues}
              onSubmit={(values) => {
                const customerPromise: Promise<Customer> = updateSimpleData({
                  version: customerData.version,
                  ID: customerData.id,
                  actions: [
                    {
                      action: 'changeAddress',
                      addressId: address.id,
                      address: {
                        country: values.country,
                        city: values.city,
                        streetName: values.street,
                        postalCode: values.postalCode
                      }
                    }
                  ]
                });
                showToast({
                  promise: customerPromise,
                  pending: 'Изменяем...',
                  success: 'Адрес изменён!',
                  errorHandler: errorHandler
                });
                customerPromise.then(() => {
                  dispatch(getCustomer(customerData.id));
                });
              }}
              validationSchema={AddressSchema}
            >
              <Form className={styles.address_form}>
                <ProfileAddress customerData={customerData} addressId={address.id} index={index} />
              </Form>
            </Formik>
          );
        })
      )}
    </>
  );
}
