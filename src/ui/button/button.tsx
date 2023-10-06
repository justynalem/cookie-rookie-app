import { ReactNode, MouseEvent } from "react";
import "./button.scss";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className: string;
}

export function Button({
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
