import React from "react";

// importing components
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import Search from "./Search";
import Settings from "./Settings";

// importing icons
import { MdChevronLeft } from "react-icons/md";

export default function Panel({
  currNode,
  breakpoint,
  setDisplayMenu,
  setCurrNode,
  setEditing,
  editing,
  updateGraph,
  deleteNode,
  graph,
  createLink,
  removeLink,
  selection,
  editingSettings,
}) {
  if (breakpoint === 0) {
    // mobile breakpoint
    if (editingSettings === true) {
      <div className="fixed top-0 left-0 z-10 p-3 bg-gray-dark text-gray-lightest w-80 ring-gray">
        <Settings />
      </div>;
    } else if (currNode.id === "") {
      return (
        <div className="fixed top-0 left-0 w-screen p-3 text-gray-lightest">
          <Search setDisplayMenu={setDisplayMenu} />
        </div>
      );
    } else {
      return (
        <>
          <div className="fixed top-0 left-0 w-screen p-3 text-gray-lightest">
            <Search setDisplayMenu={setDisplayMenu} />
          </div>
          <div className="fixed bottom-0 left-0 z-10 w-screen p-3 bg-opacity-75 rounded-t-lg shadow-lg ring-1 bg-gray-dark text-gray-lightest ring-gray">
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
              <NodeDisplay
                currNode={currNode}
                setEditing={setEditing}
                graph={graph}
              />
            )}
          </div>
        </>
      );
    }
  }
  // larger than mobile
  else if (editingSettings === true) {
    <div className="fixed top-0 left-0 z-10 p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-dark text-gray-lightest w-80 ring-gray">
      <Settings />
    </div>;
  } else if (currNode.id === "") {
    return (
      <div className="fixed top-0 left-0 p-3 w-80 text-gray-lightest">
        <Search setDisplayMenu={setDisplayMenu} />
      </div>
    );
  } else {
    return (
      <>
        <div className="fixed top-0 left-0 z-10 p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-dark text-gray-lightest w-80 ring-gray">
          <Search setDisplayMenu={setDisplayMenu} />
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
            <NodeDisplay
              currNode={currNode}
              setEditing={setEditing}
              graph={graph}
            />
          )}
        </div>

        <button>
          <MdChevronLeft className="absolute top-0 z-0 mt-2 rounded-lg p-7 left-72 btn"></MdChevronLeft>
        </button>
      </>
    );
  }
}
