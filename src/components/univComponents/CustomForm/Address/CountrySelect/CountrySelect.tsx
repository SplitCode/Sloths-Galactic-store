import { Field } from 'formik';
import styles from './CountrySelect.module.css';

export function CountrySelect({ name }: { name: string }) {
  return (
    <label className={styles.label}>
      Choose your county
      <Field className={styles.selectField} component="select" name={name} id={`${name}-select`}>
        <option className={styles.option} value="Russia">
          Russia
        </option>
        <option className={styles.option} value="Belarus">
          Belarus
        </option>
      </Field>
    </label>
  );
}
