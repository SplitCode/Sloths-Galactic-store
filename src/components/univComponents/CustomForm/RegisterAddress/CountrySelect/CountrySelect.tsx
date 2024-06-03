import { Field } from 'formik';
import styles from './CountrySelect.module.css';

export function CountrySelect({ name, disabled }: { name: string; disabled?: boolean }) {
  return (
    <label className={styles.label}>
      {disabled ? 'Страна' : 'Выберите страну'}
      <Field
        disabled={disabled}
        className={styles.selectField}
        component="select"
        name={name}
        id={`${name}-select`}
      >
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
