import React, { useState } from "react";

// importing components
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import Search from "./Search";
import Settings from "./Settings";
import EditPassword from "./EditPassword";

// importing icons
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

export default function Panel({
  updateGraph,
  focusedNode,
  breakpoint,
  setDisplayMenu,
  setfocusedNode,
  setEditingNode,
  editingNode,
  deleteNode,
  graph,
  createLink,
  removeLink,
  selection,
  editingSettings,
  setEditingSettings,
  setDisplayDiscardNodePopUp,
  setDisplayDiscardNodeChangesPopUp,
  setDisplayDeleteNodePopUp,
}) {
  const [panelHidden, setPanelHidden] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  if (breakpoint === 0) {
    // mobile breakpoint
    if (editingSettings === true) {
      return (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-opacity-75 bg-gray-darkest border-gray-darker">
          <Settings
            setEditingSettings={setEditingSettings}
            setEditingPassword={setEditingPassword}
          />
        </div>
      );
    } else if (editingPassword === true) {
      return (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-opacity-75 bg-gray-darkest border-gray-darker">
          <EditPassword setEditingPassword={setEditingPassword} />
        </div>
      );
    } else if (focusedNode.id === "") {
      return (
        <div className="fixed top-0 left-0 w-screen p-3">
          <Search setDisplayMenu={setDisplayMenu} />
        </div>
      );
    } else if (editingNode === true) {
      return (
        <>
          <div className="fixed top-0 left-0 w-screen p-3">
            <Search setDisplayMenu={setDisplayMenu} />
          </div>
          <div className="fixed bottom-0 left-0 z-10 w-screen p-3 bg-opacity-75 shadow-lg rounded-t-2xl ring-1 bg-gray-darkest ring-gray-darker">
            {/* small divider */}
            <div className="flex items-center w-12 border-2 rounded-full border-gray-darker"></div>
            {/* node content */}
            {editingNode ? (
              <EditNode
                updateGraph={updateGraph}
                focusedNode={focusedNode}
                setfocusedNode={setfocusedNode}
                setEditingNode={setEditingNode}
                deleteNode={deleteNode}
                createLink={createLink}
                removeLink={removeLink}
                graph={graph}
                selection={selection}
                setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
                setDisplayDiscardNodeChangesPopUp={
                  setDisplayDiscardNodeChangesPopUp
                }
                setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
              />
            ) : (
              <NodeDisplay
                focusedNode={focusedNode}
                setEditingNode={setEditingNode}
                graph={graph}
              />
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="fixed top-0 left-0 w-screen p-3">
            <Search setDisplayMenu={setDisplayMenu} />
          </div>
          <div className="fixed bottom-0 left-0 z-10 w-screen p-3 bg-opacity-75 shadow-lg rounded-t-2xl ring-1 bg-gray-darkest ring-gray-darker">
            {/* small divider */}
            <div className="flex items-center w-12 border-2 rounded-full border-gray-darker"></div>
            {/* node display */}
            <NodeDisplay
              focusedNode={focusedNode}
              setEditingNode={setEditingNode}
              graph={graph}
            />
          </div>
        </>
      );
    }
  }
  // larger than mobile
  else if (editingSettings === true) {
    return (
      <div className="fixed top-0 left-0 z-10 p-3 bg-opacity-75 shadow-lg border-1 bg-gray-darkest w-80 border-gray-darker">
        <Settings setEditingSettings={setEditingSettings} />
      </div>
    );
  } else if (focusedNode.id === "") {
    return (
      <div className="fixed top-0 left-0 p-3 w-80">
        <Search setDisplayMenu={setDisplayMenu} />
      </div>
    );
  } else {
    return (
      <>
        {panelHidden ? (
          <>
            <div className="fixed top-0 z-10 h-screen p-3 bg-opacity-75 shadow-lg -left-80 ring-1 bg-gray-darkest text-gray-lightest w-80 ring-gray-darker">
              <Search setDisplayMenu={setDisplayMenu} />
              {editingNode ? (
                <EditNode
                  updateGraph={updateGraph}
                  focusedNode={focusedNode}
                  setfocusedNode={setfocusedNode}
                  setEditingNode={setEditingNode}
                  deleteNode={deleteNode}
                  createLink={createLink}
                  removeLink={removeLink}
                  graph={graph}
                  selection={selection}
                  setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
                  setDisplayDiscardNodeChangesPopUp={
                    setDisplayDiscardNodeChangesPopUp
                  }
                  setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
                />
              ) : (
                <NodeDisplay
                  focusedNode={focusedNode}
                  setEditingNode={setEditingNode}
                  graph={graph}
                />
              )}
            </div>
            <button
              onClick={() => setPanelHidden(false)}
              className="absolute left-0 z-0 p-4 mt-1 text-lg bg-opacity-75 border rounded-r-full shadow-lg top-2 bg-gray-darkest border-gray-darker"
            >
              <MdChevronRight />
            </button>
          </>
        ) : (
          <>
            <div className="fixed top-0 left-0 z-10 h-screen p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-darkest w-80 ring-gray-darker">
              <Search setDisplayMenu={setDisplayMenu} />
              {editingNode ? (
                <EditNode
                  setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
                  setDisplayDiscardNodeChangesPopUp={
                    setDisplayDiscardNodeChangesPopUp
                  }
                  setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
                  updateGraph={updateGraph}
                  focusedNode={focusedNode}
                  setfocusedNode={setfocusedNode}
                  setEditingNode={setEditingNode}
                  deleteNode={deleteNode}
                  createLink={createLink}
                  removeLink={removeLink}
                  graph={graph}
                  selection={selection}
                />
              ) : (
                <NodeDisplay
                  focusedNode={focusedNode}
                  setEditingNode={setEditingNode}
                  graph={graph}
                />
              )}
            </div>
            <button
              onClick={() => setPanelHidden(true)}
              className="absolute z-0 p-4 mt-1 text-lg bg-opacity-75 border rounded-r-full shadow-lg top-2 left-80 bg-gray-darkest border-gray-darker"
            >
              <MdChevronLeft />
            </button>
          </>
        )}
      </>
    );
  }
}
