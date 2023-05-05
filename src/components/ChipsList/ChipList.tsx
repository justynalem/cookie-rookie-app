import { Chip } from "../../ui";
import "./ChipsList.scss";

interface ChipsListProps {
  items: string[];
  onDelete: (item: string) => void;
}
export function ChipsList({ items = [], onDelete }: ChipsListProps) {
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
