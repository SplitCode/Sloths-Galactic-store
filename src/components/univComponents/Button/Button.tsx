import type { ButtonProps } from '../UnivComponents.interfaces';
import styles from './Button.module.css';

export function Button({ children, type, onClick, classes, minimal, disabled }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${minimal ? styles.button_minimal : styles.button_standart} ${classes?.join(' ')}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
}
