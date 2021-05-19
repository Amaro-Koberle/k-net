import React, { useState } from "react";

// importing components
import EditNode from "./EditNode";
import NodeDisplay from "./NodeDisplay";
import Search from "./Search";
import Settings from "./Settings";
import EditPassword from "./EditPassword";
import Menu from "./Menu";
//import DiscardNodePopUp from "./components/DiscardNodePopUp";
//import DiscardNodeChangesPopUp from "./components/DiscardNodeChangesPopUp";
//import DeleteNodePopUp from "./components/DeleteNodePopUp";

// importing icons
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

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
}) {
  // is the panel currently hidden?
  const [panelHidden, setPanelHidden] = useState(false);

  // mobile breakpoint
  return (
    <>
      {breakpoint === 0 ? (
        <>
          {focusedNode.id !== "" ? (
            <>
              {/* panel */}
              {editingNode ? (
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
                <div className="fixed bottom-0 left-0 z-10 w-screen p-3 bg-opacity-75 shadow-lg rounded-t-2xl ring-1 bg-gray-darkest ring-gray-darker">
                  {/* small divider */}
                  <div className="grid w-full justify-items-center">
                    <div className="w-10 border-2 rounded-full border-gray-dark"></div>
                  </div>
                  <NodeDisplay
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
        <span>placeholder</span>
      )}
    </>
  );
}

// larger than mobile
// if (editingSettings === true) {
//   return (
//     <div className="fixed top-0 left-0 z-10 p-3 bg-opacity-75 shadow-lg border-1 bg-gray-darkest w-80 border-gray-darker">
//       <Settings setEditingSettings={setEditingSettings} />
//     </div>
//   );
// } else if (focusedNode.id === "") {
//   return (
//     <div className="fixed top-0 left-0 p-3 w-80">
//       <Search setDisplayMenu={setDisplayMenu} />
//     </div>
//   );
// } else {
//   return (
//     <>
//       {panelHidden ? (
//         <>
//           <div className="fixed top-0 z-10 h-screen p-3 bg-opacity-75 shadow-lg -left-80 ring-1 bg-gray-darkest text-gray-lightest w-80 ring-gray-darker">
//             <Search setDisplayMenu={setDisplayMenu} />
//             {editingNode ? (
//               <EditNode
//                 updateGraph={updateGraph}
//                 focusedNode={focusedNode}
//                 setFocusedNode={setFocusedNode}
//                 setEditingNode={setEditingNode}
//                 deleteNode={deleteNode}
//                 createLink={createLink}
//                 removeLink={removeLink}
//                 graph={graph}
//                 selection={selection}
//                 setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
//                 setDisplayDiscardNodeChangesPopUp={
//                   setDisplayDiscardNodeChangesPopUp
//                 }
//                 setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
//               />
//             ) : (
//               <NodeDisplay
//                 focusedNode={focusedNode}
//                 setEditingNode={setEditingNode}
//                 graph={graph}
//               />
//             )}
//           </div>
//           <button
//             onClick={() => setPanelHidden(false)}
//             className="absolute left-0 z-0 p-4 mt-1 text-lg bg-opacity-75 border rounded-r-full shadow-lg top-2 bg-gray-darkest border-gray-darker"
//           >
//             <MdChevronRight />
//           </button>
//         </>
//       ) : (
//         <>
//           <div className="fixed top-0 left-0 z-10 h-screen p-3 bg-opacity-75 shadow-lg ring-1 bg-gray-darkest w-80 ring-gray-darker">
//             <Search setDisplayMenu={setDisplayMenu} />
//             {editingNode ? (
//               <EditNode
//                 setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
//                 setDisplayDiscardNodeChangesPopUp={
//                   setDisplayDiscardNodeChangesPopUp
//                 }
//                 setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
//                 updateGraph={updateGraph}
//                 focusedNode={focusedNode}
//                 setFocusedNode={setFocusedNode}
//                 setEditingNode={setEditingNode}
//                 deleteNode={deleteNode}
//                 createLink={createLink}
//                 removeLink={removeLink}
//                 graph={graph}
//                 selection={selection}
//               />
//             ) : (
//               <NodeDisplay
//                 focusedNode={focusedNode}
//                 setEditingNode={setEditingNode}
//                 graph={graph}
//               />
//             )}
//           </div>
//           <button
//             onClick={() => setPanelHidden(true)}
//             className="absolute z-0 p-4 mt-1 text-lg bg-opacity-75 border rounded-r-full shadow-lg top-2 left-80 bg-gray-darkest border-gray-darker"
//           >
//             <MdChevronLeft />
//           </button>
//         </>
//       )}
//     </>
//   );
// }
