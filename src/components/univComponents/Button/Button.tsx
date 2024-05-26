import type { ButtonProps } from '../UnivComponents.interfaces';
import styles from './Button.module.css';

export function Button({ children, type, onClick, classes }: ButtonProps) {
  return (
    <button className={`${styles.button} ${classes?.join(' ')}`} type={type} onClick={onClick}>
      <p className={styles.buttonText}>{children}</p>
    </button>
  );
}
