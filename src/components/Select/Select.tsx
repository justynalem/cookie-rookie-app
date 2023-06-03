import ReactSelect, { Options, SingleValue } from "react-select";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Options<Option>;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Select = ({ options, onChange, placeholder }: SelectProps) => {
  function handleChange(selectedOptions: SingleValue<Option>) {
    if (!selectedOptions) {
      return;
    }

    onChange(selectedOptions.value);
  }
  return (
    <ReactSelect
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      theme={theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: "lightblue",
          primary: "#0F2027",
        },
      })}
    />
  );
};
