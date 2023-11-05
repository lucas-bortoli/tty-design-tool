import styled from "styled-components";
import { useDrag } from "./hooks/useDrag";
import { useRef, useState } from "react";
import { useTextJustify } from "./hooks/useTextJustify";
import { useResize } from "./hooks/useResize";
import { Point, Size } from "../../utils/Dimensions";
import { useTerminal } from "../TerminalContext";
import { useSelected } from "./hooks/useSelected";

const TextNodeStyle = styled.div`
  background: #5f819d;
  color: #fff;
  user-select: none;
  white-space: pre;

  position: absolute;
  display: inline-block;

  &[x-selected="true"] {
    box-shadow: 0 0 0 1px cyan;

    .resizeHandle {
      display: inline-block;
    }
  }
`;

const ResizeHandle = styled.span`
  display: none;
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: calc(-8px / 2);
  right: calc(-8px / 2);
  border-radius: 50%;
  background: cyan;
  cursor: se-resize;
`;

interface TextNodeProps {
  content: string;
  justifyContent?: "start" | "center" | "end";
}

export function TextNode(props: TextNodeProps) {
  const term = useTerminal();

  const [isSelected, setSelected] = useState<boolean>(false);
  const [size, setSize] = useState<Size>({ width: 8, height: 1 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });

  const $elementRef = useRef<HTMLDivElement>(null);
  const $resizeHandleRef = useRef<HTMLSpanElement>(null);

  useSelected({ nodeRef: $elementRef, setSelected });

  useResize({
    nodeRef: $elementRef,
    resizeHandleRef: $resizeHandleRef,
    isSelected,
    axis: "both",
    setSize,
  });

  useDrag({ size, setPosition, nodeRef: $elementRef, isSelected });

  const text = useTextJustify({
    text: props.content,
    desiredWidth: size.width,
    justifyContent: props.justifyContent,
  });

  return (
    <TextNodeStyle
      x-selected={isSelected.toString()}
      ref={$elementRef}
      style={{ left: position.x * term.columnWidth, top: position.y * term.rowHeight }}>
      {text}
      <ResizeHandle className="resizeHandle" ref={$resizeHandleRef} />
    </TextNodeStyle>
  );
}
