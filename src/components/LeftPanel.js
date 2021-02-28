import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";

export default function LeftPanel({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  removeLink,
}) {
  return (
    <div className="left-panel">
      <EditNode
        currNode={currNode}
        setCurrNode={setCurrNode}
        editing={editing}
        setEditing={setEditing}
        updateGraph={updateGraph}
        removeLink={removeLink}
      />
      <NodeDisplay
        currNode={currNode}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}
