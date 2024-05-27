import { Field } from 'formik';
import styles from './CountrySelect.module.css';

export function CountrySelect({ name }: { name: string }) {
  return (
    <label className={styles.label}>
      Выберите свою страну
      <Field className={styles.selectField} component="select" name={name} id={`${name}-select`}>
        <option className={styles.option} value="RU">
          Россия
        </option>
        <option className={styles.option} value="BY">
          Беларусь
        </option>
      </Field>
    </label>
  );
}
