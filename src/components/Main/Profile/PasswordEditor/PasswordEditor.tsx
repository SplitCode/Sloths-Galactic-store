import { Button } from '../../../univComponents/Button/Button';
import { Form, Formik } from 'formik';
import styles from './PasswordEditor.module.css';
import { Input } from '../../../univComponents/CustomForm/Input/Input';
import type { EditorProps, PasswordEditorValues } from '../../Main.interfaces';
import { PasswordEditorSchema } from '../../validationSchemes';
import type { Customer } from '@commercetools/platform-sdk';
import { showToast } from '../../../../helpers/showToast';
import { errorHandler } from '../../../../helpers/errorHandler';
import { loginCustomer } from '../../../../api/customers/loginCustomer';
import { useAppDispatch } from '../../../../store/hooks';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { EditorTitle } from '../EditorTitle/EditorTitle';
import { updatePassword } from '../../../../api/customers/updatePassword';

export function PasswordEditor({ customerData, setEditMode }: EditorProps) {
  const initialValues: PasswordEditorValues = {
    currentPassword: '',
    newPassword: ''
  };
  const dispatch = useAppDispatch();

  return (
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
              setEditMode((editModes) => {
                return {
                  ...editModes,
                  isPasswordEdit: false
                };
              });
            })
            .catch((error: Error) => console.error(error));
        }}
        validationSchema={PasswordEditorSchema}
      >
        <Form className={styles.form}>
          <EditorTitle>Изменение пароля</EditorTitle>
          <Input placeholder="Текущий пароль" name="currentPassword" type="password" />
          <Input placeholder="Новый пароль" name="newPassword" type="password" />
          <div className={styles.buttons}>
            <Button minimal classes={[styles.button]} type="submit">
              Сохранить
            </Button>
            <Button
              minimal
              classes={[styles.button]}
              onClick={() => {
                setEditMode((editModes) => {
                  return {
                    ...editModes,
                    isPasswordEdit: false
                  };
                });
              }}
              type="button"
            >
              Отмена
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
