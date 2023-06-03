import { Chip } from "../../ui";
import "./ChipsList.scss";

interface ChipsListProps {
  items: string[];
  onDelete: (item: string) => void;
}
export function ChipsList({ items = [], onDelete }: ChipsListProps) {
  if (items.length < 1) {
    return null
  }
  return (
    <div className='chipsList'>
      {items.map(item => (
        <Chip key={item} onRemove={() => onDelete(item)}>
          {item}
        </Chip>
      ))}
    </div>
  );
}
