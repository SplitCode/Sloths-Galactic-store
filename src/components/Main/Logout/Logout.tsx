import { logout } from '../../../api/customers/logoutCustomer';
import { useAppDispatch } from '../../../store/hooks';
import logoutImg from '../../../assets/img/logout.svg';
import styles from './Logout.module.css';

export function Logout() {
  const dispatch = useAppDispatch();
  return (
    <button className={styles.button} onClick={() => logout(dispatch)}>
      <img src={logoutImg} alt={'Logout'} />
    </button>
  );
}
