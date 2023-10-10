import { ReactNode, MouseEvent } from "react";
import "./button.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button className='btn' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
