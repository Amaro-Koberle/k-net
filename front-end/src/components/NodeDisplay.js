import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

//importing profile picture
import profilePicture from "../KarlPopper.jpg";

//importing components
import NodeWidget from "./NodeWidget";

export default function NodeDisplay({ focusedNode, setEditingNode, graph }) {
  const [noInLinks, setNoInLinks] = useState(false);
  const [noOutLinks, setNoOutLinks] = useState(false);

  // these are just placeholders
  const userName = "Karl Popper";
  const date = "Edited Sep 17, 94";

  //TODO hide "Incoming links" and "Outgoing links" section when there are no corresponding connections (this is currently not working for reasons that I don't understand)

  if (focusedNode.inLinks === []) {
    setNoInLinks(true);
  }

  if (focusedNode.outLinks === []) {
    setNoOutLinks(true);
  }

  if (focusedNode.id === "") {
    return null;
  }

  return (
    <div className="m-2 mt-4">
      {/* header */}
      <div className="flex items-center justify-between text-lg">
        <h3>{focusedNode.title}</h3>
        <button className="edit-button" onClick={() => setEditingNode(true)}>
          <MdEdit />
        </button>
      </div>
      {/* author and date*/}
      <div className="flex items-center mt-4 space-x-2 text-sm">
        <img
          className="border rounded-full h-7 w-7 border-gray-darker"
          src={profilePicture}
          alt={userName}
        />
        <span>{userName}</span>
        <span className="text-gray-light">•</span>
        <span className="text-gray-light">{date}</span>
      </div>
      {/* description */}
      <p className="mt-4 text-sm">{focusedNode.description}</p>
      {/* incoming links */}
      {noInLinks ? null : (
        <>
          <span className="flex justify-center mt-4 text-sm text-gray-light">
            Incoming links
          </span>
          {/* <ul>
            {focusedNode.inLinks.map((link, idx) => (
              <li key={idx}>
                <NodeWidget NodeID={link} graph={graph} />
              </li>
            ))}
          </ul> */}
        </>
      )}
      {/* outgoing links */}
      {noOutLinks ? null : (
        <>
          <span className="flex justify-center mt-4 text-sm text-gray-light">
            Outgoing links
          </span>
          {/* <ul>
            {focusedNode.outLinks.map((link, idx) => (
              <li key={idx}>
                <NodeWidget NodeID={link} graph={graph} />
              </li>
            ))}
          </ul> */}
        </>
      )}
    </div>
  );
}
