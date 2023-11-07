import styled from "styled-components";
import { useEditor } from "./components/EditorContext";
import { useEffect } from "react";
import { EditorView } from "./components/EditorView";

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export function App() {
  return (
    <StyledApp>
      <EditorView />
    </StyledApp>
  );
}
