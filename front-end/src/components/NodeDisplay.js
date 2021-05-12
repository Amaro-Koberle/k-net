import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

//importing components
import NodeWidget from "./NodeWidget";

export default function NodeDisplay({ currNode, setEditing, graph }) {
  const [noInLinks, setNoInLinks] = useState(false);
  const [noOutLinks, setNoOutLinks] = useState(false);

  //TODO hide "Incoming links" and "Outgoing links" section when there are no corresponding connections (this is currently not working for reasons that I don't understand)

  if (currNode.inLinks === []) {
    setNoInLinks(true);
  }

  if (currNode.outLinks === []) {
    setNoOutLinks(true);
  }

  if (currNode.id === "") {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-lg">
        <h3>{currNode.title}</h3>
        <button className="edit-button" onClick={() => setEditing(true)}>
          <MdEdit />
        </button>
      </div>
      <p className="mt-4 text-sm">{currNode.description}</p>
      {/* incoming links */}
      {noInLinks ? null : (
        <>
          <span className="flex justify-center mt-4 text-sm text-gray-light">
            Incoming links
          </span>
          {/* <ul>
            {currNode.inLinks.map((link, idx) => (
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
            {currNode.outLinks.map((link, idx) => (
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
