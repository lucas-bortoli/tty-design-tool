import { MutableRefObject, useEffect } from "react";

interface UseSelectedProps {
  nodeRef: MutableRefObject<HTMLDivElement | null>;
  setSelected: (active: boolean) => void;
}

export function useSelected({ nodeRef, setSelected }: UseSelectedProps) {
  useEffect(() => {
    if (!nodeRef.current) {
      return;
    }

    const $node = nodeRef.current;

    function onClick(event: MouseEvent) {
      if ($node.contains(event.target as Node)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    }

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [nodeRef]);
}
