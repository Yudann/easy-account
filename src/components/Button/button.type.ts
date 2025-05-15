import { ButtonHTMLAttributes } from 'react';
import { ButtonSize, ButtonType, ButtonVariant } from './button.enum';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  variant: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  block?: boolean;
  uppercase?: boolean;
}
