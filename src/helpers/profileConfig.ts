import { type AddressType, ProfileMode } from '../components/Main/Main.interfaces';
import editIcon from '../assets/img/edit.svg';
import passwordIcon from '../assets/img/change_password.svg';
import addressIcon from '../assets/img/address.svg';

export const setProfileModeButtons = [
  { mode: ProfileMode.PersonalEdit, iconSrc: editIcon, text: 'Редактировать' },
  { mode: ProfileMode.PasswordEdit, iconSrc: passwordIcon, text: 'Изменить пароль' },
  { mode: ProfileMode.AddressesEdit, iconSrc: addressIcon, text: 'Управление адресами' }
];

export const hints: { text: string; type: AddressType }[] = [
  { text: 'Адрес доставки', type: 'shipping' },
  { text: 'Адрес доставки по умолчанию', type: 'defaultShipping' },
  { text: 'Адрес выставления счёта', type: 'billing' },
  { text: 'Адрес выставления счёта по умолчанию', type: 'defaultBilling' }
];
