import styles from './Hint.module.css';

export function Hint({
  children,
  hint,
  classes
}: {
  children: JSX.Element;
  hint: string;
  classes?: string[];
}) {
  return (
    <div className={`${styles.hint_wrapper} ${classes?.join(' ')}`}>
      <span className={styles.hint_text}>{hint}</span>
      {children}
    </div>
  );
}
