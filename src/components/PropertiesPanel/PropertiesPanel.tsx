import styled from "styled-components";
import { run } from "../../utils/run";
import { useEditor } from "../Node/EditorContext";
import { Panel } from "../Panel";
import { useTerminal } from "../TerminalContext";
import { PointInputGroup, SizeInputGroup } from "./PointInputGroup";
import { TextInput } from "./TypedInput";

const PanelWithStyles = styled(Panel)`
  * {
    outline: none;
  }

  input {
    padding: 0.5em;
    background: #f0f0f0;
    border: 1px solid transparent;
    width: 100%;
  }

  input:focus-within {
    border-color: #ccc;
  }
`;

export function PropertiesPanel() {
  const editor = useEditor();
  const terminal = useTerminal();
  const selectedNode = editor.getSelectedNodes()[0];

  return (
    <PanelWithStyles>
      {run(() => {
        if (!selectedNode) {
          return <span>Selecione um item.</span>;
        }

        return (
          <>
            <details open>
              <summary>Position</summary>
              <PointInputGroup
                min={{ x: 0, y: 0 }}
                max={{
                  x: terminal.columns - selectedNode.size.width,
                  y: terminal.rows - selectedNode.size.height,
                }}
                value={selectedNode.position}
                onChange={pos => editor.updateNode({ id: selectedNode.id, position: pos })}
              />
            </details>
            <details open>
              <summary>Size</summary>
              <SizeInputGroup
                min={{ width: 1, height: 1 }}
                max={{ width: terminal.columns, height: 1 }}
                value={selectedNode.size}
                onChange={size => editor.updateNode({ id: selectedNode.id, size })}
              />
            </details>
            {run(() => {
              if (selectedNode.kind === "text") {
                return (
                  <details open>
                    <summary>Text node</summary>
                    <TextInput
                      value={selectedNode.content}
                      onChange={content => editor.updateNode({ id: selectedNode.id, content })}
                    />
                  </details>
                );
              }
            })}
          </>
        );
      })}
    </PanelWithStyles>
  );
}
