import { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { clamp } from "../../utils/clamp";

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

export function NumberInput({ min, max, value, onChange }: NumberInputProps) {
  min = min ?? -Infinity;
  max = max ?? Infinity;

  return (
    <input
      type="number"
      value={value}
      style={{ textAlign: "right" }}
      onChange={event => onChange(clamp(min!, parseFloat(event.currentTarget.value), max!))}
    />
  );
}

type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (newValue: string) => void;
  maxLength?: number;
  placeholder?: string;
};

export function TextInput({ maxLength, value, onChange, ...props }: TextInputProps) {
  maxLength = maxLength ?? Infinity;

  return (
    <input
      type="text"
      {...props}
      maxLength={maxLength}
      value={value}
      onChange={event => onChange(event.target.value.substring(0, maxLength))}
    />
  );
}

type SelectProps<Key extends string> = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> & {
  items: Record<Key, string>;
  value: Key;
  onChange: (newValue: Key) => void;
};

export function Select<Key extends string>({
  items,
  value,
  onChange,
  ...props
}: SelectProps<Key>) {
  return (
    <select {...props} value={value} onChange={ev => onChange(ev.currentTarget.value as Key)}>
      {Object.keys(items).map(key => {
        return (
          <option key={key} value={key}>
            {items[key as Key]}
          </option>
        );
      })}
    </select>
  );
}
