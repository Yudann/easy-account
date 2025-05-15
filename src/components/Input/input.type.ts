import { InputHTMLAttributes } from 'react';
import { InputSize } from './input.enum';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  block?: boolean;
  inputSize?: InputSize;
  isError?: boolean;
}
