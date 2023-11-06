import styled from "styled-components";
import { useDrag } from "./hooks/useDrag";
import { useRef, useState } from "react";
import { useResize } from "./hooks/useResize";
import { useTerminal } from "../TerminalContext";
import { useSelected } from "./hooks/useSelected";
import { ResizeHandle } from "./ResizeHandle";
import { BoxNodeData, useEditor } from "../EditorContext";

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

interface BoxNodeProps {
  data: BoxNodeData;
}

export function BoxNode({ data }: BoxNodeProps) {
  const editor = useEditor();
  const term = useTerminal();

  const $elementRef = useRef<HTMLDivElement>(null);
  const $resizeHandleRef = useRef<HTMLSpanElement>(null);

  useSelected({ nodeRef: $elementRef, nodeId: data.id });

  useResize({
    nodeRef: $elementRef,
    resizeHandleRef: $resizeHandleRef,
    isSelected: data.isSelected,
    axis: "both",
    setSize(n) {
      editor.updateNode({
        id: data.id,
        size: {
          width: n.width >= 2 ? n.width : 2,
          height: n.height >= 2 ? n.height : 2,
        },
      });
    },
  });

  useDrag({
    nodeRef: $elementRef,
    isSelected: data.isSelected,
    size: data.size,
    setPosition(p) {
      editor.updateNode({ id: data.id, position: p });
    },
  });

  return (
    <BoxNodeStyle
      x-selected={data.isSelected.toString()}
      ref={$elementRef}
      style={{
        left: data.position.x * term.columnWidth,
        top: data.position.y * term.rowHeight,
        width: data.size.width * term.columnWidth,
        height: data.size.height * term.rowHeight,
      }}>
      {createBoxText(data.size.width, data.size.height)}
      <ResizeHandle className="resizeHandle" ref={$resizeHandleRef} />
    </BoxNodeStyle>
  );
}
