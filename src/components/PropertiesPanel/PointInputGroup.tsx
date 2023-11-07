import styled from "styled-components";
import { Point, Size } from "../../utils/Dimensions";
import { NumberInput } from "./TypedInput";
import { clamp } from "../../utils/clamp";

const HorizontalGroup = styled.div`
  display: flex;
  gap: 2px;

  input {
    width: 100%;
  }
`;

interface PointInputGroupProps {
  min?: Point;
  max?: Point;
  value: Point;
  onChange(newValue: Point): void;
}

export function PointInputGroup({ min, max, value, onChange }: PointInputGroupProps) {
  min = min ?? { x: -Infinity, y: -Infinity };
  max = max ?? { x: Infinity, y: Infinity };

  return (
    <HorizontalGroup>
      <NumberInput
        value={value.x}
        onChange={newX => onChange({ x: clamp(min!.x, newX, max!.x), y: value.y })}
      />
      <NumberInput
        value={value.y}
        onChange={newY => onChange({ x: value.x, y: clamp(min!.y, newY, max!.y) })}
      />
    </HorizontalGroup>
  );
}

interface SizeInputGroupProps {
  min?: Size;
  max?: Size;
  value: Size;
  onChange(newValue: Size): void;
}

export function SizeInputGroup({ min, max, value, onChange }: SizeInputGroupProps) {
  min = min ?? { width: 0, height: 0 };
  max = max ?? { width: Infinity, height: Infinity };

  return (
    <HorizontalGroup>
      <NumberInput
        value={value.width}
        onChange={newWidth => onChange({ width: clamp(min!.width, newWidth, max!.width), height: value.height })}
      />
      <NumberInput
        value={value.height}
        onChange={newHeight => onChange({ width: value.width, height: clamp(min!.height, newHeight, max!.height) })}
      />
    </HorizontalGroup>
  );
}
