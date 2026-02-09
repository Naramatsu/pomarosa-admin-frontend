export interface IItems {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  name: string;
  value: string;
  items: IItems[];
  itemDefault?: boolean;
  isRequired?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  items = [],
  isRequired = false,
  onChange = () => {},
  itemDefault = false,
}) => (
  <div className="form-control">
    {label && <label>{label}</label>}
    <select name={name} value={value} required={isRequired} onChange={onChange}>
      {itemDefault && <option value="">- Cualquiera -</option>}
      {items.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
