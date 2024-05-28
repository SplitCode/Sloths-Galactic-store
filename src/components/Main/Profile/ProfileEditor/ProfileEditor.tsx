import { Formik } from 'formik';
import { Button } from '../../../univComponents/Button/Button';
import type { ProfileComponentsProps, ProfileEditorValues } from '../../Main.interfaces';
import styles from './ProfileEditor.module.css';
import { Form } from 'react-router-dom';
import { Input } from '../../../univComponents/CustomForm/Input/Input';
import { Address } from '../../../univComponents/CustomForm/Address/Address';
import { showToast } from '../../../../helpers/showToast';
import { ProfileSchema } from '../../validationSchemes';
import { isCorrectCountry } from '../../../../helpers/isCorrectCountry';
import { updateSimpleData } from '../../../../api/customers/updateCustomer';
import { formatForUpdate } from '../../../../helpers/formatForUpdate';
import { errorHandler } from '../../../../helpers/errorHandler';
import type { Customer } from '@commercetools/platform-sdk';
import { useAppDispatch } from '../../../../store/hooks';
import { getCustomer } from '../../../../api/customers/getCustomer';

export function ProfileEditor({
  setEditMode,
  customerData,
  shippingAddress,
  billingAddress
}: ProfileComponentsProps) {
  if (!isCorrectCountry(shippingAddress.country) || !isCorrectCountry(billingAddress.country)) {
    throw new Error('incorrect country');
  }
  const dispatch = useAppDispatch();

  const initialValues: ProfileEditorValues = {
    email: customerData.email,
    firstName: customerData.firstName || '',
    lastName: customerData.lastName || '',
    dateOfBirth: customerData.dateOfBirth || '',
    shipping: {
      street: shippingAddress.streetName || '',
      city: shippingAddress.city || '',
      postalCode: shippingAddress.postalCode || '',
      country: shippingAddress.country,
      isDefault: Boolean(customerData.defaultShippingAddressId)
    },
    billing: {
      street: billingAddress.streetName || '',
      city: billingAddress.city || '',
      postalCode: billingAddress.postalCode || '',
      country: billingAddress.country,
      isDefault: Boolean(customerData.defaultBillingAddressId)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const customerPromise: Promise<Customer> = updateSimpleData(
          formatForUpdate({ values, ID: customerData.id, version: customerData.version })
        );

        showToast({
          promise: customerPromise,
          pending: 'Обновляем...',
          success: 'Данные обновлены!',
          errorHandler: errorHandler
        });
        customerPromise.then(() => {
          dispatch(getCustomer(customerData.id));
          setEditMode((isEditMode) => !isEditMode);
        });
      }}
      validationSchema={ProfileSchema}
    >
      {({ submitForm }) => {
        return (
          <Form className={styles.profile_editor}>
            <h1 className={styles.editor_title}>
              Режим редактирования<span className={styles.underline}>_</span>
            </h1>
            <Input name={'email'} type="email" placeholder="Эл. почта"></Input>
            <div className={styles.inputs_group}>
              <Input name={'firstName'} type="text" placeholder="Имя"></Input>
              <Input name={'lastName'} type="text" placeholder="Фамилия"></Input>
            </div>
            <Input name={'dateOfBirth'} type="date" placeholder="Дата рождения"></Input>

            <Address name="shipping" inProfile={true} />
            <Address name="billing" />

            <Button onClick={submitForm} type="submit">
              Сохранить
            </Button>
            <Button
              classes={[styles.cancel_btn]}
              onClick={() => setEditMode((isEditMode) => !isEditMode)}
              type="button"
            >
              Отмена
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
