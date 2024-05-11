import styles from './PasswordButton.module.css';
import visible from './../../../../assets/img/visible.svg';
import noVisible from './../../../../assets/img/noVisible.svg';

interface PasswordButtonProps {
  togglePasswordVisibility: () => void;
  passwordVisibility: boolean;
}

export const PasswordButton = ({ togglePasswordVisibility, passwordVisibility }: PasswordButtonProps) => {
  return (
    <button type="button" onClick={togglePasswordVisibility} className={styles.password_button}>
      <img src={passwordVisibility ? visible : noVisible} alt="password visibility" />
    </button>
  );
};
