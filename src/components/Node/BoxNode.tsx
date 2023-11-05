import styled from "styled-components";
import { useDrag } from "./hooks/useDrag";
import { useRef, useState } from "react";
import { useResize } from "./hooks/useResize";
import { Point, Size } from "../../utils/Dimensions";
import { useTerminal } from "../TerminalContext";
import { useSelected } from "./hooks/useSelected";
import { ResizeHandle } from "./ResizeHandle";

const BoxNodeStyle = styled.div`
  background: #8f5f9d;
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

function createBoxText(width: number, height: number) {
  const chars = {
    tl: "┌",
    top: "─",
    tr: "┐",
    right: "│",
    br: "┘",
    bottom: "─",
    bl: "└",
    left: "│",
  };

  const lines: string[] = [];

  if (lines.length < height)
    lines.push(
      `${chars.tl}${chars.top.repeat(width - chars.tl.length - chars.tr.length)}${chars.tr}`
    );
  while (lines.length < height - 1)
    lines.push(
      `${chars.left}${" ".repeat(width - chars.left.length - chars.right.length)}${chars.right}`
    );
  if (lines.length < height)
    lines.push(
      `${chars.bl}${chars.bottom.repeat(width - chars.bl.length - chars.br.length)}${chars.br}`
    );

  return lines.join("\n");
}

interface BoxNodeProps {}

export function BoxNode(props: BoxNodeProps) {
  const term = useTerminal();

  const [isSelected, setSelected] = useState<boolean>(false);
  const [size, setSizeRaw] = useState<Size>({ width: 8, height: 8 });

  function setSize(n: Size) {
    setSizeRaw({
      width: n.width >= 2 ? n.width : 2,
      height: n.height >= 2 ? n.height : 2,
    });
  }

  const [position, setPosition] = useState<Point>({ x: 5, y: 10 });

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

  return (
    <BoxNodeStyle
      x-selected={isSelected.toString()}
      ref={$elementRef}
      style={{
        left: position.x * term.columnWidth,
        top: position.y * term.rowHeight,
        width: size.width * term.columnWidth,
        height: size.height * term.rowHeight,
      }}>
      {createBoxText(size.width, size.height)}
      <ResizeHandle className="resizeHandle" ref={$resizeHandleRef} />
    </BoxNodeStyle>
  );
}
