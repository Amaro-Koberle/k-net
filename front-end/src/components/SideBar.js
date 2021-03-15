import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import Search from "./Search";

export default function SideBar({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  createLink,
  removeLink,
}) {
  if (currNode.id === "") {
    return (
      <div className="h-screen p-3 w-80">
        <Search></Search>
      </div>
    );
  }
  return (
    <div className="h-screen p-3 bg-gray-800 w-80">
      <div className="p-2">
        <Search></Search>
        {editing ? (
          <EditNode
            currNode={currNode}
            setCurrNode={setCurrNode}
            setEditing={setEditing}
            updateGraph={updateGraph}
            createLink={createLink}
            removeLink={removeLink}
          />
        ) : (
          <NodeDisplay currNode={currNode} setEditing={setEditing} />
        )}
      </div>
    </div>
  );
}
