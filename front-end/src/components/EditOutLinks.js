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
  graph,
  removeLink,
  setCreatingOutLink,
}) {
  const [targetInput, setTargetInput] = useState("");

  return (
    <>
      <>
        <div
          onClick={() => setCreatingOutLink(true)}
          className="inline-flex items-center justify-between w-full p-2 px-5 mt-2 rounded-full bg-primary-darker"
        >
          <input
            className="input"
            type="text"
            id="targetNodeInput"
            placeholder="Create outgoing link"
            value={targetInput}
            onInput={(e) => setTargetInput(e.target.value)}
          />
          <button className="text-lg" type="button">
            <MdLocationSearching></MdLocationSearching>
          </button>
        </div>
      </>
      {/* list of outgoing links */}
      <ul className="mt-4">
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
      </ul>
    </>
  );
}
