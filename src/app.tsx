import { PropertiesPanel } from "./components/PropertiesPanel";
import { Terminal } from "./components/Terminal";
import styled from "styled-components";
import { TerminalProvider } from "./components/TerminalContext";

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
  return (
    <StyledApp>
      <TerminalProvider>
        <PropertiesPanel />
        <PanView>
          <Terminal />
        </PanView>
        <PropertiesPanel />
      </TerminalProvider>
    </StyledApp>
  );
}
