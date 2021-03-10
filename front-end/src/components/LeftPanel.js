import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";

export default function LeftPanel({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  createLink,
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
        createLink={createLink}
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
