import { Field } from 'formik';
import styles from './Planets.module.css';

export function Planets() {
  return (
    <>
      <h2 className={styles.title}>Select a planet</h2>
      <div className={styles.planets}>
        <Field className={`${styles.planet} ${styles.venus}`} type="radio" name="planet" value="venus" />
        <Field className={`${styles.planet} ${styles.earth}`} type="radio" name="planet" value="earth" />
        <Field className={`${styles.planet} ${styles.mars}`} type="radio" name="planet" value="mars" />
      </div>
    </>
  );
}
