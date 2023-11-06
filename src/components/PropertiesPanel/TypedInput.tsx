import { DetailedHTMLProps, InputHTMLAttributes } from "react";
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
      style={{textAlign: "right"}}
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
