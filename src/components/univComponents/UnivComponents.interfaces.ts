export interface ButtonProps {
  children: string | JSX.Element;
  type: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  classes?: string[];
  minimal?: boolean;
  disabled?: boolean;
}

export interface InputProps {
  placeholder: string;
  name: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'date' | 'search' | 'number';
  disabled?: boolean;
}
