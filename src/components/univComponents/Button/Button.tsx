import type { ButtonProps } from '../UnivComponents.interfaces';
import styles from './Button.module.css';

export function Button({ children, type, onClick, classes, minimal }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${minimal ? styles.button_minimal : styles.button_standart} ${classes?.join(' ')}`}
      type={type}
      onClick={onClick}
    >
      <p className={styles.buttonText}>{children}</p>
    </button>
  );
}
