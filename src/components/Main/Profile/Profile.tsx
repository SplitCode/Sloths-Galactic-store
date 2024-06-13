import { useAppSelector } from '../../../store/hooks';
import type { CustomerSliceState } from '../../../store/slices/customer-slice';
import styles from './Profile.module.css';
import { PersonalEditor } from './PersonalEditor/PersonalEditor';
import { ProfileViewer } from './ProfileViewer/ProfileViewer';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';
import { PasswordEditor } from './PasswordEditor/PasswordEditor';
import { AddressesEditor } from './AddressesEditor/AddressesEditor';
import { Button } from '../../univComponents/Button/Button';
import { ProfileMode } from '../Main.interfaces';
import { setProfileModeButtons } from '../../../helpers/profileConfig';

export function Profile() {
  const { customerId, isCustomerLoading, customerData, errorMessage }: CustomerSliceState = useAppSelector(
    (state) => state.customer_slice
  );

  const [mode, setMode] = useState<ProfileMode>(ProfileMode.Default);

  if (isCustomerLoading) return <Loader />;
  if (errorMessage || !customerData || !customerId) return <p>Упс... Что-то пошло не так: {errorMessage}</p>;

  const Editors: Record<Exclude<ProfileMode, ProfileMode.Default>, JSX.Element> = {
    [ProfileMode.PersonalEdit]: <PersonalEditor setMode={setMode} customerData={customerData} />,
    [ProfileMode.AddressesEdit]: <AddressesEditor setMode={setMode} customerData={customerData} />,
    [ProfileMode.PasswordEdit]: <PasswordEditor setMode={setMode} customerData={customerData} />
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile_wrapper}>
        <h1>Профиль</h1>

        {mode === ProfileMode.Default ? (
          <>
            <ProfileViewer customerData={customerData} />
            {setProfileModeButtons.map((btn) => {
              return (
                <Button
                  key={btn.mode}
                  onClick={() => setMode(btn.mode)}
                  classes={[styles.button]}
                  type="button"
                >
                  <>
                    {btn.text} <img src={btn.iconSrc} alt="edit icon" className={styles.icon} />
                  </>
                </Button>
              );
            })}
          </>
        ) : (
          Editors[mode]
        )}
      </div>
    </div>
  );
}
