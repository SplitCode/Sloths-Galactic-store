export interface StringObj {
  [key: string]: string;
}

export interface LoginValues {
  email: string;
  password: string;
}

interface AddressField {
  street: string;
  city: string;
  postalCode: string;
  country: 'Russia' | 'Belarus';
  isDefault: boolean;
}

export interface RegisterValues extends LoginValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: AddressField;
}
