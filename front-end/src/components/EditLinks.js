import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//importing react components
import NodeWidget from "./NodeWidget";

//importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function EditLinks({
  focusedNode,
  setfocusedNode,
  graph,
  isIncoming,
  removeLink,
  handleNodeClick,
  createLink,
  selection,
}) {
  const [sourceInput, setSourceInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [connectSelectionMode, setConnectSelectionMode] = useState(false);

  //connect nodes with connectSelectionMode
  useEffect(() => {
    // check if connectSelectionMode is on
    if (connectSelectionMode === true) {
      if (isIncoming === true) {
        createLink(focusedNode, selection[1]);
      } else {
        createLink(selection[1], focusedNode);
      }
      setfocusedNode(selection[1]);
      setConnectSelectionMode(false);
    }
  }, [selection]);
  return (
    <>
      {isIncoming ? (
        //===INCOMING LINKS===//
        <div className="container">
          <span className="flex justify-center text-sm text-gray-light">
            Incoming links
          </span>

          <>
            <div className="inline-flex items-center justify-between w-full p-2 px-5 mt-2 rounded-full bg-gray-darker">
              <input
                className="input"
                type="text"
                id="sourceNodeInput"
                placeholder="Source node"
                value={sourceInput}
                onInput={(e) => setSourceInput(e.target.value)}
              ></input>

              <button
                className="text-lg"
                type="button"
                onClick={() => setConnectSelectionMode(!connectSelectionMode)}
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
      ) : (
        //===OUTGOING LINKS===//
        <div className="container">
          <span className="flex justify-center text-sm text-gray-light">
            Outgoing links
          </span>
          <>
            <div className="inline-flex items-center justify-between w-full p-2 px-5 mt-2 rounded-full bg-gray-darker">
              <input
                className="input"
                type="text"
                id="targetNodeInput"
                placeholder="Target node"
                value={targetInput}
                onInput={(e) => setTargetInput(e.target.value)}
              ></input>
              <button
                className="text-lg"
                type="button"
                onClick={() => setConnectSelectionMode(!connectSelectionMode)}
              >
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
      )}
    </>
  );
}
