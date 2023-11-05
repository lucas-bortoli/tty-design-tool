import styled from "styled-components";

export const ResizeHandle = styled.span`
  display: none;
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: calc(-8px / 2);
  right: calc(-8px / 2);
  border-radius: 50%;
  background: cyan;
  cursor: se-resize;
`;
