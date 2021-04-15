import React from "react";
import { useState } from "react";

//importing components
import EditLinks from "./EditLinks";

//importing icons
import { MdClose } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdLocationSearching } from "react-icons/md";

export default function EditNode({
  currNode,
  setCurrNode,
  setEditing,
  updateGraph,
  deleteNode,
  createLink,
  handleNodeClick,
  selection,
  graph,
  removeLink,
}) {
  const [nodeSelectionMode, setNodeSelectionMode] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 text-lg">
        <>
          <button onClick={() => setEditing(false)}>
            <MdClose></MdClose>
          </button>
        </>
        <>
          <h3>Edit Node</h3>
        </>
        <>
          <button type="button" onClick={() => deleteNode(currNode.identity)}>
            <MdDelete></MdDelete>
          </button>
        </>
      </div>
      <form className="mt-4">
        {/* edit title and description */}
        <>
          <label className="label" htmlFor="title">
            Title
          </label>
          <>
            <input
              className="w-full input"
              type="text"
              id="title"
              placeholder="Title"
              value={currNode.title}
              onInput={(e) =>
                setCurrNode({ ...currNode, title: e.target.value })
              }
            ></input>
          </>
          <>
            <label className="label" htmlFor="description">
              Description
            </label>
            <>
              <textarea
                className="w-full input"
                rows="5"
                id="description"
                placeholder="Description"
                value={currNode.description}
                onInput={(e) =>
                  setCurrNode({ ...currNode, description: e.target.value })
                }
              ></textarea>
            </>
          </>
        </>
        {/* edit links */}
        <EditLinks
          isIncoming={true}
          selection={selection}
          handleNodeClick={handleNodeClick}
          currNode={currNode}
          setCurrNode={setCurrNode}
          removeLink={removeLink}
          createLink={createLink}
          graph={graph}
        />
        <EditLinks
          isIncoming={false}
          selection={selection}
          handleNodeClick={handleNodeClick}
          currNode={currNode}
          setCurrNode={setCurrNode}
          removeLink={removeLink}
          createLink={createLink}
          graph={graph}
        />
        {/* save and delete */}
        <div className="mt-4"></div>
      </form>
    </div>
  );
}
