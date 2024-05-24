import { Form } from 'formik';
import styles from './CustomForm.module.css';
import video from '../../../assets/video/starry-sky.webm';

export function CustomForm({ children }: { children: JSX.Element }) {
  return (
    <>
      <video src={video} className={styles.video} loop muted autoPlay />
      <Form className={styles.form}>{children}</Form>
    </>
  );
}
