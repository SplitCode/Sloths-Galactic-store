import { Input } from '../Input/Input';
import { Checkbox } from '../../Checkbox/Checkbox';
import { CountrySelect } from './CountrySelect/CountrySelect';
import styles from './Address.module.css';
import { useFormikContext } from 'formik';
import type { RegisterValues } from '../../../Main/Main.interfaces';

export function Address({ name }: { name: 'shipping' | 'billing' }) {
  const { values }: { values: RegisterValues } = useFormikContext();

  return (
    <fieldset
      className={`${styles.address} ${name === 'billing' && values.shipping.isSameAddress && styles.hidden}`}
    >
      <legend className={styles.legend}>{name} address</legend>
      <CountrySelect name={`${name}.country`}></CountrySelect>
      <Input name={`${name}.city`} type="text" placeholder="City"></Input>
      <Input name={`${name}.street`} type="text" placeholder="Street"></Input>
      <Input name={`${name}.postalCode`} type="text" placeholder="Postal code"></Input>
      <Checkbox name={`${name}.isDefault`}>Use as default</Checkbox>

      {name === 'shipping' && <Checkbox name={'shipping.isSameAddress'}>Use as the billing address</Checkbox>}
    </fieldset>
  );
}
