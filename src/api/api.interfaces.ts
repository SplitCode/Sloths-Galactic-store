export interface Login {
  email: string;
  password: string;
}

export interface CustomerAddress {
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
  addresses: CustomerAddress[];
  shippingAddresses: number[];
  billingAddresses: number[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
