import { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import type { InputProps } from '../../UnivComponents.interfaces';
import { PasswordButton } from '../PasswordButton/PasswordButton';
import styles from './Input.module.css';
import { ValidError } from './ValidError/ValidError';

export function Input({ name, type, placeholder }: InputProps) {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevShowPassword: boolean) => !prevShowPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
  };

  return (
    <label className={styles.label}>
      <Field
        className={styles.field}
        name={name}
        type={type === 'password' ? (passwordVisibility ? 'text' : 'password') : type}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {type === 'password' && (
        <PasswordButton
          togglePasswordVisibility={togglePasswordVisibility}
          passwordVisibility={passwordVisibility}
        />
      )}
      <div className={styles.line} />
      <ValidError name={name} />
    </label>
  );
}
