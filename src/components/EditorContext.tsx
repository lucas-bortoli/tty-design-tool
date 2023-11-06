import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Point, Size } from "../utils/Dimensions";
import { ColorIdentifier } from "./types/ColorScheme";

interface BaseNodeData {
  id: number;
  size: Size;
  position: Point;
  zIndex: number;
  isSelected: boolean;
}

export interface BoxNodeData extends BaseNodeData {
  kind: "box";
  backgroundColor: ColorIdentifier;
  foregroundColor: ColorIdentifier;
}

export interface TextNodeData extends BaseNodeData {
  kind: "text";
  content: string;
  justifyContent: "start" | "center" | "end";
  backgroundColor: ColorIdentifier;
  foregroundColor: ColorIdentifier;
}

export type NodeData = BoxNodeData | TextNodeData;
export type NodeDataWithoutId = Omit<BoxNodeData, "id"> | Omit<TextNodeData, "id">;

export type NodeId = number & { __brand?: "nodeId" };

interface EditorContext {
  /**
   * All existing editor nodes, ordered by z-index
   */
  nodes: { [id: NodeId]: NodeData };
  updateNode(data: Partial<NodeData> & { id: NodeId }): void;
  createNode(data: NodeDataWithoutId): void;
  getSelectedNodes(): NodeData[];
}

let _nodeIdAcc: NodeId = 1000;

const EditorContext = createContext<EditorContext | null>(null);
export const useEditor = () => useContext(EditorContext)!;
export function EditorProvider(props: PropsWithChildren) {
  const [nodes, setNodes] = useState<{ [id: number]: NodeData }>({});

  const value: EditorContext = {
    nodes: nodes,
    updateNode(partialData) {
      setNodes(nodes => {
        const id = partialData.id;
        const previousData = nodes[id];
        const mergedData = Object.assign({}, previousData, partialData);

        return { ...nodes, [id]: mergedData };
      });
    },
    createNode(dataWithoutId) {
      const id = ++_nodeIdAcc;
      const data = {
        ...dataWithoutId,
        id,
      };

      setNodes(nodes => ({ ...nodes, [id]: data }));
    },
    getSelectedNodes() {
      return Object.values(nodes).filter(node => node.isSelected);
    }
  };

  return <EditorContext.Provider value={value}>{props.children}</EditorContext.Provider>;
}
