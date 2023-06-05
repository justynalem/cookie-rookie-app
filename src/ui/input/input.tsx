import { ChangeEvent, KeyboardEvent, forwardRef } from "react";
import "./input.scss";

export interface InputProps {
  name?: string;
  value?: string;
  placeholder: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, value, placeholder, onChange, onKeyDown }: InputProps, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        name={name}
        className="input"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);
