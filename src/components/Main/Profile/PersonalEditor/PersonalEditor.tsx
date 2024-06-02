import { Formik } from 'formik';
import { Button } from '../../../univComponents/Button/Button';
import type { EditorProps, ProfileEditorValues } from '../../Main.interfaces';
import styles from './PersonalEditor.module.css';
import { Form } from 'react-router-dom';
import { Input } from '../../../univComponents/CustomForm/Input/Input';
import { showToast } from '../../../../helpers/showToast';
import { PersonalDataSchema } from '../../validationSchemes';
import { updateSimpleData } from '../../../../api/customers/updateSimpleData';
import { formatForUpdate } from '../../../../helpers/formatForUpdate';
import { errorHandler } from '../../../../helpers/errorHandler';
import type { Customer } from '@commercetools/platform-sdk';
import { useAppDispatch } from '../../../../store/hooks';
import { getCustomer } from '../../../../api/customers/getCustomer';
import { EditorTitle } from '../EditorTitle/EditorTitle';

export function PersonalEditor({ setEditMode, customerData }: EditorProps) {
  const dispatch = useAppDispatch();

  const initialValues: ProfileEditorValues = {
    email: customerData.email,
    firstName: customerData.firstName || '',
    lastName: customerData.lastName || '',
    dateOfBirth: customerData.dateOfBirth || ''
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
          setEditMode((editModes) => {
            return {
              ...editModes,
              isPersonalEdit: false
            };
          });
        });
      }}
      validationSchema={PersonalDataSchema}
    >
      {({ submitForm }) => {
        return (
          <Form className={styles.profile_editor}>
            <EditorTitle>Редактирование</EditorTitle>

            <Input name={'email'} type="email" placeholder="Эл. почта"></Input>
            <Input name={'firstName'} type="text" placeholder="Имя"></Input>
            <Input name={'lastName'} type="text" placeholder="Фамилия"></Input>
            <Input name={'dateOfBirth'} type="date" placeholder="Дата рождения"></Input>

            <div className={styles.buttons}>
              <Button classes={[styles.button]} minimal onClick={submitForm} type="submit">
                Сохранить
              </Button>
              <Button
                minimal
                classes={[styles.button]}
                onClick={() =>
                  setEditMode((editModes) => {
                    return {
                      ...editModes,
                      isPersonalEdit: false
                    };
                  })
                }
                type="button"
              >
                Отмена
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
