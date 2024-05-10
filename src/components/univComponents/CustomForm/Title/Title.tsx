import styles from './Title.module.css';

export function Title({ children }: { children: string }) {
  return (
    <>
      <h2 className={styles.titleAddition}>Welcome to the future</h2>
      <h1 className={styles.titleMain}>{children}</h1>
    </>
  );
}
