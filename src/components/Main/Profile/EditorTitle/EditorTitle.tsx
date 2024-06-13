import styles from './EditorTitle.module.css';

export function EditorTitle({ children }: { children: string }) {
  return (
    <h1 className={styles.editor_title}>
      {children}
      <span className={styles.underline}>_</span>
    </h1>
  );
}
