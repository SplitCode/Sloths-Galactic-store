import styles from './Loader.module.css';
export function Loader() {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}
