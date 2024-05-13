export interface ButtonProps {
  children: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: (...args: unknown[]) => unknown;
}

export interface InputProps {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  children: JSX.Element;
}
