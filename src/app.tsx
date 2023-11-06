import { PropertiesPanel } from "./components/PropertiesPanel";
import { Terminal } from "./components/Terminal";
import styled from "styled-components";
import { TerminalProvider } from "./components/TerminalContext";
import { useEditor } from "./components/EditorContext";
import { useEffect } from "react";

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const PanView = styled.section`
  flex-grow: 1;
  height: 100%;
  position: relative;
  overflow: scroll;
`;

export function App() {
  const editor = useEditor();

  function createTextNode() {
    editor.createNode({
      kind: "text",
      position: { x: 0, y: 0 },
      size: { width: 10, height: 1 },
      zIndex: 1,
      content: "Novo",
      justifyContent: "center",
      isSelected: false,
    });
  }

  useEffect(() => {
    createTextNode();
    createTextNode();
    createTextNode();
  }, []);

  return (
    <StyledApp>
      <TerminalProvider>
        <div>
          <button onClick={createTextNode}>+ texto</button>
          <button
            onClick={() =>
              editor.createNode({
                kind: "box",
                position: { x: 0, y: 0 },
                size: { width: 2, height: 2 },
                zIndex: 1,
                isSelected: false,
              })
            }>
            + caixa
          </button>
        </div>
        <PanView>
          <Terminal />
        </PanView>
        <PropertiesPanel />
      </TerminalProvider>
    </StyledApp>
  );
}
