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
      <div className="fixed top-0 left-0 h-screen p-3 w-80 text-gray-lightest">
        <Search></Search>
      </div>
    );
  }
  return (
    <div className="fixed top-0 left-0 h-screen p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-dark text-gray-lightest w-80 ring-gray">
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
