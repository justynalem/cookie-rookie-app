import { ReactNode } from "react";
import "./input.scss";

interface InputProps {
  placeholder?: string;
  onChange?: (e: any) => void;
}

export function Input({ placeholder, onChange }: InputProps) {
  return <input className="input" placeholder={placeholder} onChange={onChange} />;
}

