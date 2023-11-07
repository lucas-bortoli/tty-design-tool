import styled from "styled-components";
import { NodeData, useEditor } from "./EditorContext";
import { PropertiesPanel } from "./PropertiesPanel/PropertiesPanel";
import { Terminal } from "./Terminal";

import CreateBoxImage from "../assets/CreateBox.png";
import CreateTextImage from "../assets/CreateText.png";

const EditorStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  grid-template-areas: "bar  bar"
                       "view panel";
`;

const PanView = styled.section`
  position: relative;
  overflow: scroll;
`;

const ControlBar = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #212121;
  grid-area: bar;
`;

const ToolbarButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border: none;
  background: #212121;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;
  color: #fff;

  &:hover {
    background: #484848;
  }

  &:active {
    background: #727272;
  }

  img {
    width: 16px;
    height: 16px;
    image-rendering: crisp-edges;
  }
`;

export function EditorView() {
  const editor = useEditor();

  function createNode(kind: NodeData["kind"]) {
    let node: NodeData;

    if (kind === "box") {
      node = editor.createNode({
        kind: "box",
        position: { x: 0, y: 0 },
        size: { width: 2, height: 2 },
        zIndex: 1,
        isSelected: false,
        backgroundColor: 6,
        foregroundColor: 2,
      });
    } else {
      node = editor.createNode({
        kind: "text",
        position: { x: 0, y: 0 },
        size: { width: 10, height: 1 },
        zIndex: 1,
        content: "Novo",
        justifyContent: "center",
        isSelected: false,
        backgroundColor: 7,
        foregroundColor: 0,
      });
    }

    editor.clearSelectedNodes();
    editor.updateNode({ ...node, isSelected: true });
  }

  return (
    <EditorStyles>
      <ControlBar>
        <ToolbarButton onClick={() => createNode("text")}><img src={CreateTextImage} />Adicionar texto</ToolbarButton>
        <ToolbarButton onClick={() => createNode("box")}><img src={CreateBoxImage} />Adicionar caixa</ToolbarButton>
      </ControlBar>
      <PanView>
        <Terminal />
      </PanView>
      <PropertiesPanel />
    </EditorStyles>
  );
}
