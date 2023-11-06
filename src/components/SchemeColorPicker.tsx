import styled from "styled-components";
import { Point } from "../utils/Dimensions";
import { createPortal } from "react-dom";
import { useTerminal } from "./TerminalContext";
import { ColorIdentifier, getColorFromScheme } from "./types/ColorScheme";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const Popup = styled.div`
  position: absolute;
  top: 0;
  border: 1px solid #ccc;
  background: #fff;
  padding: 1em;
  z-index: 1000;
  box-shadow: 2px 2px 4px #00000080;

  h1 {
    font-size: 1rem;
    margin-top: 0;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
`;

const ColorButton = styled.button<{ $color: string }>`
  display: inline-block;
  width: 3em;
  height: 2em;
  background: ${props => props.$color};
  border: 1px solid #ccc;

  span {
    opacity: 0.7;
    color: ${props => props.$color};
    filter: invert();
  }
`;

interface PopupProps {
  color: ColorIdentifier;
  onChange(color: ColorIdentifier): void;
}

export function SchemeColorPicker({ color, onChange }: Readonly<PopupProps>) {
  const terminal = useTerminal();

  const [location, setLocation] = useState<Point | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popupRef, () => {
    setLocation(null);
  });

  return (
    <>
      <ColorButton
        $color={getColorFromScheme(terminal.colorScheme, color)}
        onClick={event => {
          setLocation({ x: event.clientX, y: event.clientY });
        }}
      />

      {location &&
        createPortal(
          <Popup style={{ top: location.y, right: innerWidth - location.x }} ref={popupRef}>
            <h1>Select color</h1>
            <ColorGrid>
              {(
                [
                  "bg",
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  "fg",
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                ] as ColorIdentifier[]
              ).map(color => {
                return (
                  <ColorButton
                    $color={getColorFromScheme(terminal.colorScheme, color)}
                    onClick={() => onChange(color)}
                    key={color}>
                    <span>{color}</span>
                  </ColorButton>
                );
              })}
            </ColorGrid>
          </Popup>,
          document.body
        )}
    </>
  );
}
