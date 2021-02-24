import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";

export default function LeftPanel({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  removeEdge,
}) {
  return (
    <div className="left-panel">
      <EditNode
        currNode={currNode}
        setCurrNode={setCurrNode}
        editing={editing}
        setEditing={setEditing}
        updateGraph={updateGraph}
        removeEdge={removeEdge}
      />
      <NodeDisplay
        currNode={currNode}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}
