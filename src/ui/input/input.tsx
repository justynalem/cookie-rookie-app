import { ChangeEvent } from "react";
import "./input.scss";

interface InputProps {
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, onChange }: InputProps) {
  return <input className="input" placeholder={placeholder} onChange={onChange} />;
}
