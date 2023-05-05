import { ReactNode, MouseEvent } from 'react';
import './button.scss';


interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className='btn' onClick={onClick}>{children}</button>
  );
}
