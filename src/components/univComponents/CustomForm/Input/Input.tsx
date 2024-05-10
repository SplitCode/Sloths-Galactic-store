import { Field } from 'formik';
import styles from './Input.module.css';
import type { InputProps } from '../../UnivComponents.interfaces';

export function Input({ name, type, placeholder, children }: InputProps) {
  return (
    <label className={styles.label}>
      <Field className={styles.field} name={name} type={type} placeholder={placeholder} />
      <div className={styles.line} />
      {children}
    </label>
  );
}
