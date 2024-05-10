import type { ButtonProps } from '../UnivComponents.interfaces';
import styles from './Button.module.css';

export function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      <p className={styles.buttonText}>{children}</p>
    </button>
  );
}
