export interface StringObj {
  [key: string]: string;
}

export interface RegisterValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: 'Russia' | 'Belarus';
  planet: 'mars' | 'earth' | 'venus';
}
