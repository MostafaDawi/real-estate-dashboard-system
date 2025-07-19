import React from "react";
import "./Titlebar.css";

export const Titlebar = () => {
  return (
    <div className="titlebar">
      <div className="controls">
        <button onClick={() => window.electronAPI?.minimize()}>–</button>
        <button onClick={() => window.electronAPI?.toggleMaximize()}>□</button>
        <button onClick={() => window.electronAPI?.close()}>×</button>
      </div>
    </div>
  );
};
