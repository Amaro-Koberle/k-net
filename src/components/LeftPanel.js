import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";

export default function LeftPanel({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
}) {
  return (
    <div className="left-panel">
      <EditNode
        currNode={currNode}
        setCurrNode={setCurrNode}
        editing={editing}
        updateGraph={updateGraph}
      />
      <NodeDisplay
        currNode={currNode}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}
