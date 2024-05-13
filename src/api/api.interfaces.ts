export interface Address {
  country: 'RU' | 'BY';
  city: string;
  streetName: string;
  postalCode: string;
}

export interface CustomerBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}
