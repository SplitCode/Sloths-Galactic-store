import styles from './Loader.module.css';
export function Loader({ classes }: { classes?: string[] }) {
  return (
    <div className={`${styles.loader_wrapper} ${classes?.join(' ')}`}>
      <div className={styles.loader}></div>
    </div>
  );
}

export function MiniLoader({ classes }: { classes?: string[] }) {
  return (
    <div className={`${styles.loader_wrapper} ${classes?.join(' ')}`}>
      <div className={styles.mini_loader}></div>
    </div>
  );
}
