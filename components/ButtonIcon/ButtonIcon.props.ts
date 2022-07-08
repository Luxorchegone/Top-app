import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './Up.svg';
import close from './Close.svg';
import menu from './Menu.svg';

export const icons = {
  up,
  close,
  menu
}

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: 'primary' | 'white';
}
