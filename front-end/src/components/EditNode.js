import React from "react";
import { useState } from "react";

//importing components
import EditLinks from "./EditLinks";

//importing icons
import { MdArrowBack } from "react-icons/md";
import { MdDelete } from "react-icons/md";

//importing profile picture
import profilePicture from "../KarlPopper.jpg";

export default function EditNode({
  focusedNode,
  setfocusedNode,
  setEditingNode,
  deleteNode,
  createLink,
  handleNodeClick,
  selection,
  graph,
  removeLink,
  updateGraph,
  setDisplayDiscardNodePopUp,
  setDisplayDiscardNodeChangesPopUp,
  setDisplayDeleteNodePopUp,
}) {
  // this is just a placeholder
  const userName = "Karl Popper";

  // posting the node
  const post = () => {
    updateGraph();
    setEditingNode(false);
  };

  return (
    <div className="mt-4">
      {/* header */}
      <div className="flex items-center text-lg jsutify-between">
        <div className="flex items-center space-x-2">
          <button onClick={() => setDisplayDiscardNodeChangesPopUp(true)}>
            <MdArrowBack />
          </button>
          <h3>Edit Node</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setDisplayDeleteNodePopUp(focusedNode.id)}
          >
            <MdDelete />
          </button>
          <button
            onClick={() => post()}
            className="px-5 btn bg-gray-lighter text-gray-darkest"
            type="button"
          >
            Post
          </button>
        </div>
      </div>

      <form className="mt-4">
        <div className="container bg-gray-darker">
          {/* author */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <img
                className="w-8 h-8 border rounded-full border-gray"
                src={profilePicture}
                alt={userName}
              />
              <span>{userName}</span>
            </div>
            {/* visibility */}
            <select className="select" id="visibility">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          {/* title and description */}
          <>
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="w-full input"
              type="text"
              id="title"
              value={focusedNode.title}
              onInput={(e) =>
                setfocusedNode({ ...focusedNode, title: e.target.value })
              }
            ></input>
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full input"
              rows="5"
              id="description"
              value={focusedNode.description}
              onInput={(e) =>
                setfocusedNode({
                  ...focusedNode,
                  description: e.target.value,
                })
              }
            ></textarea>
          </>
        </div>
        {/* links */}
        <EditLinks
          isIncoming={true}
          selection={selection}
          handleNodeClick={handleNodeClick}
          focusedNode={focusedNode}
          setfocusedNode={setfocusedNode}
          removeLink={removeLink}
          createLink={createLink}
          graph={graph}
        />
        <EditLinks
          isIncoming={false}
          selection={selection}
          handleNodeClick={handleNodeClick}
          focusedNode={focusedNode}
          setfocusedNode={setfocusedNode}
          removeLink={removeLink}
          createLink={createLink}
          graph={graph}
        />
      </form>
    </div>
  );
}
