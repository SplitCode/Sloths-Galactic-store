import { Form, Formik } from 'formik';
import { useAppDispatch } from '../../../../store/hooks';
import type { Customer } from '@commercetools/platform-sdk';
import type { BillingAddress } from '../../Main.interfaces';
import { updateSimpleData } from '../../../../api/customers/updateSimpleData';
import { errorHandler } from '../../../../helpers/errorHandler';
import { showToast } from '../../../../helpers/showToast';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { AddressSchema } from '../../validationSchemes';
import { ProfileAddress } from './ProfileAddress/ProfileAddress';

export function NewAddress({
  customerData,
  setAddingAddress,
  formStyles
}: {
  customerData: Customer;
  setAddingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  formStyles: string;
}) {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: Omit<BillingAddress, 'isDefault'>) => {
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
  };

  return (
    <Formik
      initialValues={{
        country: 'RU',
        city: '',
        street: '',
        postalCode: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={AddressSchema}
    >
      <Form className={formStyles}>
        <ProfileAddress isNew={true} setAddingAddress={setAddingAddress} />
      </Form>
    </Formik>
  );
}
