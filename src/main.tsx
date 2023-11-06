import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./index.css";
import { TerminalProvider } from "./components/TerminalContext.tsx";
import { EditorProvider } from "./components/Node/EditorContext.tsx";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <EditorProvider>
      <TerminalProvider>
        <App />
      </TerminalProvider>
    </EditorProvider>
  </React.StrictMode>
);
