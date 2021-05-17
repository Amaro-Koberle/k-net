import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//importing react components
import NodeWidget from "./NodeWidget";

//importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function EditOutLinks({
  focusedNode,
  setFocusedNode,
  graph,
  removeLink,
  createLink,
  selection,
  creatingOutLink,
  setCreatingOutLink,
}) {
  const [targetInput, setTargetInput] = useState("");

  return (
    <div className="container">
      <span className="flex justify-center text-sm text-gray-light">
        Outgoing links
      </span>
      <>
        <div
          onClick={() => setCreatingOutLink(true)}
          className="inline-flex items-center justify-between w-full p-2 px-5 mt-2 rounded-full bg-gray-darker"
        >
          <input
            className="input"
            type="text"
            id="targetNodeInput"
            placeholder="Create outgoing link"
            value={targetInput}
            onInput={(e) => setTargetInput(e.target.value)}
          ></input>
          <button className="text-lg" type="button">
            <MdLocationSearching></MdLocationSearching>
          </button>
        </div>
      </>
      {/* list of nodes connected through outgoing links */}
      {/* <ul>
            {focusedNode.outLinks.map((link, idx) => {
              return (
                <li key={idx}>
                  <NodeWidget NodeID={link} graph={graph} />
                  <button
                    className="text-sm"
                    type="button"
                    onClick={() => removeLink(focusedNode.id, link)}
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
