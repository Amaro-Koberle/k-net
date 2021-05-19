import React, { useState } from "react";

// importing profile picture
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdEdit } from "react-icons/md";

// importing components
import NodeWidget from "./NodeWidget";

export default function NodeDisplay({ focusedNode, setEditingNode, graph }) {
  // TODO don't display the incoming link/ outgoing link tabs if the node isn't linked to any other node accordingly
  const [noInLinks, setNoInLinks] = useState(false);
  const [noOutLinks, setNoOutLinks] = useState(false);

  // TODO are the outgoing links being displayed?
  const [displayOutgoingLinks, setDisplayOutgoingLinks] = useState(false);

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
    <div className="m-2">
      {/* header */}
      <div className="flex items-center justify-between text-lg">
        <h3>{focusedNode.title}</h3>
        <button className="edit-button" onClick={() => setEditingNode(true)}>
          <MdEdit className="text-xl" />
        </button>
      </div>
      {/* author and date*/}
      <div className="flex items-center mt-2 space-x-2 text-sm">
        <img
          className="border rounded-full h-7 w-7 border-gray-darker"
          src={profilePicture}
          alt={userName}
        />
        <span>{userName}</span>
        <span className="text-gray-light">•</span>
        <span className="text-gray-light">{date}</span>
      </div>
      {/* prize */}
      <div className="container border-0 bg-gray-lighter text-gray-darkest">
        <div className="flex items-baseline space-x-1 text-gray-darker">
          <span className="text-xl font-bold ">$ 150,00</span>
          <span>Prize</span>
        </div>
        <p className="mt-2 text-sm">
          Placeholder for the conditions under which the prize is to be awarded.
        </p>
      </div>
      {/* description */}
      <p className="mt-4 text-sm">{focusedNode.description}</p>
      {/* link tabs */}
      {displayOutgoingLinks ? (
        <>
          {/* outgoing links tab */}
          <div className="grid grid-cols-2 justify-items-center">
            <div onClick={() => setDisplayOutgoingLinks(false)}>
              <span className="mt-4 text-sm text-gray-light">
                Incoming links
              </span>
            </div>
            <div>
              <span className="mt-4 text-sm font-bold text-gray-lightest">
                Outgoing links
              </span>
              <div className="flex items-center w-full border-2 rounded-full border-gray-lightest"></div>
            </div>
          </div>
          {/* outgoing links */}
          <ul>
            {focusedNode.outLinks.map((link, idx) => (
              <li key={idx}>
                <NodeWidget NodeID={link} graph={graph} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {/* incoming links tab */}
          <div className="grid grid-cols-2 justify-items-center">
            <div>
              <span className="mt-4 text-sm font-bold text-gray-lightest">
                Incoming links
              </span>
              <div className="flex items-center w-full border-2 rounded-full border-gray-lightest"></div>
            </div>
            <div onClick={() => setDisplayOutgoingLinks(true)}>
              <span className="mt-4 text-sm text-gray-light">
                Outgoing links
              </span>
            </div>
          </div>
          {/* incoming links */}
          <ul>
            {focusedNode.inLinks.map((link, idx) => (
              <li key={idx}>
                <NodeWidget NodeID={link} graph={graph} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
