import styled from "styled-components";

const Panel = styled.section`
  width: 300px;
  height: 100%;
  background: #fff;
  border: 3px solid #212121;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1em;
`;

export function PropertiesPanel() {
  return <Panel></Panel>;
}
