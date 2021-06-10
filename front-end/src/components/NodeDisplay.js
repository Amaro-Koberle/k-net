import React, { useState } from "react";

// importing profile picture
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdEdit } from "react-icons/md";

// importing components
import NodeWidget from "./NodeWidget";

export default function NodeDisplay({
  focusedNode,
  setEditingNode,
  graph,
  setDisplayingProfile,
}) {
  // TODO don't display the incoming link/ outgoing link tabs if the node isn't linked to any other node accordingly
  const [noInLinks, setNoInLinks] = useState(false);
  const [noOutLinks, setNoOutLinks] = useState(false);

  // TODO are the outgoing links being displayed?
  const [displayOutgoingLinks, setDisplayOutgoingLinks] = useState(false);

  // this is just a placeholder
  const userName = "Karl Popper";

  // date
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(focusedNode.createdOn);
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  const dateString = month + " " + date + ", " + year;

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
      <div className="flex items-center justify-between font-serif text-lg">
        <h1>{focusedNode.title}</h1>
        <button className="edit-button" onClick={() => setEditingNode(true)}>
          <MdEdit className="text-xl" />
        </button>
      </div>
      {/* author and date*/}
      <div className="flex items-center mt-2 space-x-2 text-sm">
        <button type="button" onClick={() => setDisplayingProfile(true)}>
          <img
            className="rounded-full h-9 w-9"
            src={profilePicture}
            alt={userName}
          />
        </button>
        <button
          type="button"
          className="link"
          onClick={() => setDisplayingProfile(true)}
        >
          {userName}
        </button>
        <span className="text-primary-light">•</span>
        <span className="text-primary-light">{dateString}</span>
      </div>
      {/* prize */}
      <div className="container border-0 bg-tertiary-lighter text-tertiary">
        <div className="flex items-baseline space-x-1 ">
          <span className="text-xl font-bold">$ 150,00</span>
          <span>Prize</span>
        </div>
        <p className="mt-2 font-serif text-sm">
          Placeholder for the text describing the conditions under which the
          prize is to be awarded.
        </p>
      </div>
      {/* description */}
      <p className="mt-4 font-serif text-sm">{focusedNode.description}</p>
      {/* link tabs */}
      {displayOutgoingLinks ? (
        // outgoing links tab
        <div className="mt-4">
          <div className="grid grid-cols-2 justify-items-center">
            <div onClick={() => setDisplayOutgoingLinks(false)}>
              <span className="mt-4 text-sm font-bold text-primary-light">
                Incoming links
              </span>
            </div>
            <div>
              <span className="mt-4 text-sm font-bold text-primary-lightest">
                Outgoing links
              </span>
              <div className="flex items-center w-full border-2 rounded-full border-primary-lightest"></div>
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
        </div>
      ) : (
        // incoming links tab
        <div className="mt-4">
          <div className="grid grid-cols-2 justify-items-center">
            <div>
              <span className="mt-4 text-sm font-bold text-primary-lightest">
                Incoming links
              </span>
              <div className="flex items-center w-full border-2 rounded-full border-primary-lightest"></div>
            </div>
            <div onClick={() => setDisplayOutgoingLinks(true)}>
              <span className="mt-4 text-sm font-bold text-primary-light">
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
        </div>
      )}
    </div>
  );
}
