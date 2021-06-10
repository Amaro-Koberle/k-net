import React, { useState } from "react";

// importing components
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import ProfileDisplay from "./ProfileDisplay";
import EditProfile from "./EditProfile";

// importing icons
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { AuthProvider } from "../contexts/AuthContext";

export default function Panel({
  updateGraph,
  focusedNode,
  breakpoint,
  setFocusedNode,
  deleteNode,
  graph,
  createLink,
  removeLink,
  selection,
  setEditingNode,
  editingNode,
  panelHidden,
  setPanelHidden,
}) {
  const [displayingProfile, setDisplayingProfile] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  return (
    <>
      {breakpoint === 0 ? (
        // mobile breakpoint
        <>
          {displayingProfile ? (
            <ProfileDisplay
              setDisplayingProfile={setDisplayingProfile}
              setEditingProfile={setEditingProfile}
            />
          ) : focusedNode.id !== "" ? (
            // panel
            <>
              {editingNode ? (
                <div className="fixed z-40 w-screen h-screen p-3 bg-primary-darkest border-primary-darker">
                  <EditNode
                    updateGraph={updateGraph}
                    focusedNode={focusedNode}
                    setFocusedNode={setFocusedNode}
                    setEditingNode={setEditingNode}
                    deleteNode={deleteNode}
                    createLink={createLink}
                    removeLink={removeLink}
                    graph={graph}
                    selection={selection}
                  />
                </div>
              ) : (
                <div className="fixed bottom-0 left-0 z-10 w-screen p-3 shadow-lg rounded-t-2xl ring-1 bg-primary-darkest ring-primary-darker">
                  {/* small divider */}
                  <div className="grid w-full justify-items-center">
                    <div className="w-10 border-2 rounded-full border-primary-dark"></div>
                  </div>
                  <NodeDisplay
                    setDisplayingProfile={setDisplayingProfile}
                    focusedNode={focusedNode}
                    setEditingNode={setEditingNode}
                    graph={graph}
                  />
                </div>
              )}
            </>
          ) : null}
        </>
      ) : (
        // larger than mobile breakpoint
        <>
          {focusedNode.id == "" && !displayingProfile ? null : (
            // panel
            <>
              {panelHidden ? (
                // panel hidden
                <>
                  <div className="fixed top-0 z-10 h-screen p-3 shadow-lg -left-96 ring-1 bg-primary-darkest w-96 ring-primary-darker">
                    <div className="relative top-20">
                      {editingProfile ? (
                        <AuthProvider>
                          <EditProfile setEditingProfile={setEditingProfile} />
                        </AuthProvider>
                      ) : displayingProfile ? (
                        <AuthProvider>
                          <ProfileDisplay
                            setDisplayingProfile={setDisplayingProfile}
                            setEditingProfile={setEditingProfile}
                          />
                        </AuthProvider>
                      ) : editingNode ? (
                        <EditNode
                          updateGraph={updateGraph}
                          focusedNode={focusedNode}
                          setFocusedNode={setFocusedNode}
                          setEditingNode={setEditingNode}
                          deleteNode={deleteNode}
                          createLink={createLink}
                          removeLink={removeLink}
                          graph={graph}
                          selection={selection}
                        />
                      ) : (
                        <NodeDisplay
                          setDisplayingProfile={setDisplayingProfile}
                          focusedNode={focusedNode}
                          setEditingNode={setEditingNode}
                          graph={graph}
                        />
                      )}
                    </div>
                  </div>
                  {/* reveal panel button */}
                  <button
                    onClick={() => setPanelHidden(false)}
                    className="absolute left-0 z-0 p-4 mt-1 text-lg border rounded-r-full shadow-lg top-2 bg-primary-darkest border-primary-darker"
                  >
                    <MdChevronRight />
                  </button>
                </>
              ) : (
                // panel shown
                <>
                  <div className="fixed top-0 left-0 z-10 h-screen p-3 overflow-y-auto shadow-lg ring-1 bg-primary-darkest w-96 ring-primary-darker">
                    <div className="relative top-20">
                      {editingProfile ? (
                        <AuthProvider>
                          <EditProfile setEditingProfile={setEditingProfile} />
                        </AuthProvider>
                      ) : displayingProfile ? (
                        <AuthProvider>
                          <ProfileDisplay
                            setDisplayingProfile={setDisplayingProfile}
                            setEditingProfile={setEditingProfile}
                          />
                        </AuthProvider>
                      ) : editingNode ? (
                        <EditNode
                          updateGraph={updateGraph}
                          focusedNode={focusedNode}
                          setFocusedNode={setFocusedNode}
                          setEditingNode={setEditingNode}
                          deleteNode={deleteNode}
                          createLink={createLink}
                          removeLink={removeLink}
                          graph={graph}
                          selection={selection}
                        />
                      ) : (
                        <NodeDisplay
                          setDisplayingProfile={setDisplayingProfile}
                          focusedNode={focusedNode}
                          setEditingNode={setEditingNode}
                          graph={graph}
                        />
                      )}
                    </div>
                  </div>
                  {/* hide panel button */}
                  <button
                    onClick={() => setPanelHidden(true)}
                    className="absolute z-0 p-4 mt-1 text-lg border rounded-r-full shadow-lg top-2 left-96 bg-primary-darkest border-primary-darker"
                  >
                    <MdChevronLeft />
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
