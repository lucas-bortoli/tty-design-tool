import styled from "styled-components";
import { TextNode } from "./Node/TextNode";
import { useTerminal } from "./TerminalContext";
import { BoxNode } from "./Node/BoxNode";

const TerminalWrapper = styled.div<{
  $fontSize: number;
  $fontFamily: string;
  $rows: number;
  $cols: number;
}>`
  --font-family: ${props => props.$fontFamily};
  --font-size: ${props => props.$fontSize}px;
  --term-cols: ${props => props.$cols};
  --term-rows: ${props => props.$rows};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid #969696;
  background: #212121;
  color: #fff;
  padding: var(--font-size);
  font-family: var(--font-family);
  box-sizing: content-box;
  box-shadow: 2px 2px 4px #00000080;

  * {
    font-family: var(--font-family);
  }
`;

const StyledTerminal = styled.div`
  font-size: var(--font-size);
  line-height: var(--font-size);
  width: calc(var(--term-cols) * 1ch);
  height: calc(var(--term-rows) * 1em);
  position: relative;
  overflow: hidden;
`;

export function Terminal() {
  const terminal = useTerminal();

  return (
    <TerminalWrapper
      $rows={terminal.rows}
      $cols={terminal.columns}
      $fontSize={terminal.fontSize}
      $fontFamily={terminal.fontFamily}>
      <StyledTerminal>
        <BoxNode />
        <TextNode content="😄" justifyContent="start" />
        <TextNode content="!😄!" justifyContent="center" />
        <TextNode content="Good Morning3" justifyContent="center" />
      </StyledTerminal>
    </TerminalWrapper>
  );
}
