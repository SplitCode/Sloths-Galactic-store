import { Button } from '../../../univComponents/Button/Button';
import passwordIcon from '../../../../assets/img/change_password.svg';
import { Form, Formik } from 'formik';
import styles from './PasswordEditor.module.css';
import { Input } from '../../../univComponents/CustomForm/Input/Input';
import type { PasswordEditorValues } from '../../Main.interfaces';
import { PasswordEditorSchema } from '../../validationSchemes';
import type { Customer } from '@commercetools/platform-sdk';
import { updatePassword } from '../../../../api/customers/updateCustomer';
import { showToast } from '../../../../helpers/showToast';
import { errorHandler } from '../../../../helpers/errorHandler';
import { loginCustomer } from '../../../../api/customers/loginCustomer';
import { useAppDispatch } from '../../../../store/hooks';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { useState } from 'react';

export function PasswordEditor({ customerData }: { customerData: Customer }) {
  const initialValues: PasswordEditorValues = {
    currentPassword: '',
    newPassword: ''
  };
  const dispatch = useAppDispatch();
  const [isEditMode, setEditMode] = useState(false);

  return isEditMode ? (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          const customerPromise: Promise<Customer> = updatePassword({
            ID: customerData.id,
            version: customerData.version,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
          });

          showToast({
            promise: customerPromise,
            pending: 'Обновляем...',
            success: 'Пароль обновлён!',
            errorHandler: errorHandler
          });
          resetForm();

          customerPromise
            .then(() => {
              loginCustomer(customerData.email, values.newPassword);
              dispatch(getCustomer(customerData.id));
              setEditMode(false);
            })
            .catch((error: Error) => console.error(error));
        }}
        validationSchema={PasswordEditorSchema}
      >
        <Form className={styles.form}>
          <h2 className={styles.title}>
            Изменение пароля <img className={styles.password_icon} src={passwordIcon} alt="password" />
          </h2>
          <Input placeholder="Текущий пароль" name="currentPassword" type="password" />
          <Input placeholder="Новый пароль" name="newPassword" type="password" />
          <Button classes={[styles.submit_btn]} type="submit">
            Сохранить
          </Button>
          <Button onClick={() => setEditMode(false)} type="button">
            Отмена
          </Button>
        </Form>
      </Formik>
    </>
  ) : (
    <Button classes={[styles.edit_password_btn]} type="button" onClick={() => setEditMode(true)}>
      <>
        Изменить пароль
        <img className={styles.edit_password_icon} src={passwordIcon} alt="password" />
      </>
    </Button>
  );
}
