import React from "react";
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import Search from "./Search";
import { MdChevronLeft } from "react-icons/md";

export default function SideBar({
  currNode,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  deleteNode,
  graph,
  createLink,
  removeLink,
  selection,
}) {
  if (currNode.id === "") {
    return (
      <div className="fixed top-0 left-0 h-screen p-3 w-80 text-gray-lightest">
        <Search></Search>
      </div>
    );
  }
  return (
    <>
      <div className="fixed top-0 left-0 z-10 h-screen p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-dark text-gray-lightest w-80 ring-gray">
        <Search></Search>
        {editing ? (
          <EditNode
            currNode={currNode}
            setCurrNode={setCurrNode}
            setEditing={setEditing}
            updateGraph={updateGraph}
            deleteNode={deleteNode}
            createLink={createLink}
            removeLink={removeLink}
            graph={graph}
            selection={selection}
          />
        ) : (
          <NodeDisplay currNode={currNode} setEditing={setEditing} />
        )}
      </div>

      <button>
        <MdChevronLeft className="absolute top-0 z-0 mt-2 rounded-lg p-7 left-72 btn"></MdChevronLeft>
      </button>
    </>
  );
}
