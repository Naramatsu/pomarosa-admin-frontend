export interface InputProps {
  id?: string;
  type?: string;
  label?: string;
  name: string;
  value: string | number;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const Input: React.FC<InputProps> = ({
  id,
  type = "text",
  label,
  name,
  value,
  placeholder,
  isRequired = false,
  onChange = () => {},
}) => (
  <div key={name} className="form-control">
    {label && <label>{label}</label>}
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      required={isRequired}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);
