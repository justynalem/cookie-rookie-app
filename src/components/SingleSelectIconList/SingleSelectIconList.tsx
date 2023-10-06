import "./SingleSelectIconList.scss";
type SingleSelectIconListProps = {
  options: { type: string; icon: string }[];
  onClick: (value: string) => void;
  value?: string;
};

export const SingleSelectIconList = ({
  onClick,
  value,
  options = [],
}: SingleSelectIconListProps) => {
  return (
    <div className='btn__list'>
      {options.map(({ icon, type }) => (
        <button
          key={type}
          className='btn__meals'
          onClick={() => onClick(type)}
          style={{
            border: value === type ? "1px solid red" : "unset",
          }}>
          <img className='btn__mealImg' src={icon} />
          <p className='btn__mealType'>{type}</p>
        </button>
      ))}
    </div>
  );
};
