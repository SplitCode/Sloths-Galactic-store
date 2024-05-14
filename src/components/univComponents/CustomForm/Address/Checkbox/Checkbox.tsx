import { Field } from 'formik';
import styles from './Checkbox.module.css';

export function Checkbox({ children, name }: { children: string; name: string }) {
  return (
    <label className={styles.label}>
      {children}
      <Field className={styles.checkbox} name={`address.${name}`} type="checkbox" />
    </label>
  );
}
