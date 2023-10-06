import { useRef } from "react";
import "./MultipleSelectIconList.scss";

type MultipleSelectIconListProps = {
  options: { type: string; icon: string }[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
  custom?: boolean;
};

export const MultipleSelectIconList = ({
  onAdd,
  onRemove,
  values,
  options = [],
  custom,
}: MultipleSelectIconListProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleAddCustom = () => {
    const value = ref.current?.value;
    if (!value || !value.trim()) {
      return;
    }
    onAdd(value);
    ref.current.value = "";
  };
  return (
    <div className='btn__list'>
      {options.map(({ icon, type }) => {
        const isSelected = values.includes(type);
        return (
          <button
            key={type}
            className='btn__meals'
            onClick={() => (isSelected ? onRemove(type) : onAdd(type))}
            style={{
              border: isSelected ? "1px solid red" : "unset",
            }}>
            <img className='btn__mealImg' src={icon} />
            <p className='btn__mealType'>{type}</p>
          </button>
        );
      })}
      {custom ? (
        <button key='type' className='btn__meals' onClick={handleAddCustom}>
          <img className='btn__mealImg' src='/add.svg' />
          <input
            placeholder='Add Custom'
            ref={ref}
            className='btn__mealType'
            onClick={e => {
              e.stopPropagation();
            }}
          />
        </button>
      ) : null}
    </div>
  );
};
