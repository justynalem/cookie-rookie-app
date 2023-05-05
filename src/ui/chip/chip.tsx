import { ReactNode } from "react";
import "./chip.scss";

interface ChipProps {
  children: ReactNode;
  onRemove?: VoidFunction;
}

export function Chip({ children, onRemove }: ChipProps) {

  return (
    <div className="chip">
      <span className="chip__circle" onClick={onRemove}>
        &ndash;
      </span>
      <div >
        {children}
      </div>
    </div>
  );
}