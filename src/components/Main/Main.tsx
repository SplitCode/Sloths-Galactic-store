import styles from './Main.module.css';

export function Main({ children }: { children: JSX.Element }) {
  return <main className={styles.main}>{children}</main>;
}
