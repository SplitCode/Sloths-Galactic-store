import { CountrySelect } from './CountrySelect/CountrySelect';
import { Input } from '../Input/Input';
import styles from './Address.module.css';
import { Checkbox } from './Checkbox/Checkbox';

export function Address() {
  return (
    <fieldset name={'address'} className={styles.address}>
      <legend className={styles.legend}>Address</legend>
      <CountrySelect name={'address.country'}></CountrySelect>

      <Input name={'address.city'} type="text" placeholder="City"></Input>
      <Input name={'address.street'} type="text" placeholder="Street"></Input>
      <Input name={'address.postalCode'} type="text" placeholder="Postal code"></Input>
      <Checkbox name="isDefault">Use as default</Checkbox>
    </fieldset>
  );
}
