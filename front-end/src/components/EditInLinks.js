import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//importing react components
import NodeWidget from "./NodeWidget";

//importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function EditInLinks({
  focusedNode,
  setFocusedNode,
  graph,
  removeLink,
  createLink,
  selection,
  creatingInLink,
  setCreatingInLink,
}) {
  const [sourceInput, setSourceInput] = useState("");

  return (
    <div className="container">
      <span className="flex justify-center text-sm text-gray-light">
        Incoming links
      </span>
      <>
        <div
          onClick={() => setCreatingInLink(true)}
          className="inline-flex items-center justify-between w-full p-2 px-5 mt-2 rounded-full bg-gray-darker"
        >
          <input
            className="input"
            type="text"
            id="sourceNodeInput"
            placeholder="Create incoming link"
            value={sourceInput}
            onInput={(e) => setSourceInput(e.target.value)}
          ></input>
          <button
            className="text-lg"
            type="button"
            onClick={() => setCreatingInLink(true)}
          >
            <MdLocationSearching />
          </button>
        </div>
      </>
      {/* list of nodes connected through incoming links */}
      {/* <ul>
            {focusedNode.inLinks.map((link, idx) => {
              return (
                <li key={idx}>
                  <NodeWidget NodeID={link} graph={graph} />
                  <button
                    type="button"
                    onClick={() => removeLink(link, focusedNode.id)}
                  >
                    <MdDelete />
                  </button>
                </li>
              );
            })}
          </ul> */}
    </div>
  );
}
