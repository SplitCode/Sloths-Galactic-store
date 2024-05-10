export interface ButtonProps {
  children: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}

export interface InputProps {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  children: JSX.Element;
}
