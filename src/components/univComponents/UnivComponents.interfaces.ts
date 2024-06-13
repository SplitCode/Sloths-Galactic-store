export interface ButtonProps {
  children: string | JSX.Element;
  type: 'submit' | 'reset' | 'button';
  onClick?: (...args: unknown[]) => unknown;
  classes?: string[];
  minimal?: boolean;
}

export interface InputProps {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  disabled?: boolean;
}
