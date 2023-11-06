import { MutableRefObject, useEffect, useRef } from "react";
import { NodeId, useEditor } from "../../EditorContext";

interface UseSelectedProps {
  nodeRef: MutableRefObject<HTMLDivElement | null>;
  nodeId: NodeId;
}

export function useSelected({ nodeRef, nodeId }: UseSelectedProps) {
  const editor = useEditor();
  const currentNode = useRef(editor.nodes[nodeId]);

  currentNode.current = editor.nodes[nodeId];

  useEffect(() => {
    if (!nodeRef.current) {
      return;
    }

    const $node = nodeRef.current;

    function onClick(event: MouseEvent) {
      const isSelected = currentNode.current.isSelected;

      if ($node.contains(event.target as HTMLElement)) {
        if (event.ctrlKey) {
          editor.updateNode({ id: nodeId, isSelected: !isSelected });
        } else {
          // Only select (mutate state) if this wasn't selected
          if (!isSelected) editor.updateNode({ id: nodeId, isSelected: true });
        }
      } else {
        // Clicked outside node
        // Multiple selection with Ctrl; don't unselect this node if other was clicked
        if (event.ctrlKey) {
          return;
        }

        // Only unselect (mutate state) if this was selected
        if (isSelected) editor.updateNode({ id: nodeId, isSelected: false });
      }
    }

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [nodeRef]);
}
