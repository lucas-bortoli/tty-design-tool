import styled from "styled-components";
import { useDrag } from "./hooks/useDrag";
import { useRef } from "react";
import { useTextJustify } from "./hooks/useTextJustify";
import { useResize } from "./hooks/useResize";
import { useTerminal } from "../TerminalContext";
import { useSelected } from "./hooks/useSelected";
import { useEditText } from "./hooks/useEditText";
import { TextNodeData, useEditor } from "../EditorContext";
import { ResizeHandle } from "./ResizeHandle";
import { getColorFromScheme } from "../types/ColorScheme";

const TextNodeStyle = styled.div`
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

interface TextNodeProps {
  data: TextNodeData;
}

export function TextNode({ data }: TextNodeProps) {
  const editor = useEditor();
  const term = useTerminal();

  const $elementRef = useRef<HTMLDivElement>(null);
  const $resizeHandleRef = useRef<HTMLSpanElement>(null);

  useSelected({
    nodeRef: $elementRef,
    nodeId: data.id,
  });

  useResize({
    nodeRef: $elementRef,
    resizeHandleRef: $resizeHandleRef,
    isSelected: data.isSelected,
    axis: "both",
    setSize(s) {
      editor.updateNode({ id: data.id, size: s });
    },
  });

  useDrag({
    size: data.size,
    nodeRef: $elementRef,
    isSelected: data.isSelected,
    setPosition(p) {
      editor.updateNode({ id: data.id, position: p });
    },
  });

  useEditText({
    nodeRef: $elementRef,
    text: data.content,
    setText(text) {
      editor.updateNode({ id: data.id, content: text });
    },
  });

  const justifiedText = useTextJustify({
    text: data.content,
    desiredWidth: data.size.width,
    justifyContent: data.justifyContent,
  });

  return (
    <TextNodeStyle
      x-selected={data.isSelected.toString()}
      ref={$elementRef}
      style={{
        left: data.position.x * term.columnWidth,
        top: data.position.y * term.rowHeight,
        background: getColorFromScheme(term.colorScheme, data.backgroundColor),
        color: getColorFromScheme(term.colorScheme, data.foregroundColor)
      }}>
      {justifiedText}
      <ResizeHandle className="resizeHandle" ref={$resizeHandleRef} />
    </TextNodeStyle>
  );
}
