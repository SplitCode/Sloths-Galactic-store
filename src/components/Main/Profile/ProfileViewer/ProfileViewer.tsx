import styles from './ProfileViewer.module.css';
import avatarSrc from '../../../../assets/img/avatar.svg';
import type { Customer } from '@commercetools/platform-sdk';

export function ProfileViewer({ customerData }: { customerData: Customer }) {
  return (
    <>
      <img src={avatarSrc} alt="avatar" className={styles.avatar} />
      <section className={styles.personal_data}>
        <p>Имя: {customerData.firstName}</p>
        <p>Фамилия: {customerData.lastName}</p>
        <p>Email: {customerData.email}</p>
        <p>Дата рождения: {customerData.dateOfBirth}</p>
      </section>
    </>
  );
}
