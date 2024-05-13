import { ErrorMessage } from 'formik';
import styles from './ValidError.module.css';

export function ValidError({ name }: { name: string }) {
  return (
    <p className={styles.error}>
      <ErrorMessage className={styles.error} name={name} />
    </p>
  );
}
