import { useRef } from "react";
import { Button, Input, InputProps } from "../../ui";
import "./InputWithButton.scss";

type InputWithButtonProps = InputProps & {
  onClick: (value: string) => boolean;
};

export function InputWithButton({
  onClick,
  onKeyDown,
  placeholder,
  name,
  onChange,
  value,
}: InputWithButtonProps) {
  const ref = useRef<HTMLInputElement>(null);

  function handleCLick() {
    if (ref.current?.value) {
      const isAdded = onClick(ref.current.value);
      if (isAdded) {
        ref.current.value = "";
      }
    }
  }
  return (
    <div className="inputWithButton">
      <Input
        ref={ref}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        name={name}
        onChange={onChange}
        value={value}
      />
      <Button onClick={handleCLick}>+</Button>
    </div>
  );
}
