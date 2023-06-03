import { ChangeEvent, KeyboardEvent } from "react";
import "./input.scss";

interface InputProps {
  name?: string;
  value?: string;
  placeholder: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
}: InputProps) {
  return (
    <input
      value={value}
      name={name}
      className='input'
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
