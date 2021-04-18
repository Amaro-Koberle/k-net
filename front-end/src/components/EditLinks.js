import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//importing icons
import { MdLocationSearching } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function EditLinks({
  currNode,
  setCurrNode,
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
        createLink(currNode, selection[1]);
      } else {
        createLink(selection[1], currNode);
      }
      setCurrNode(selection[1]);
      setConnectSelectionMode(false);
    }
  }, [selection]);

  return (
    <>
      {isIncoming ? (
        //===INCOMING LINKS===//
        <div className="mt-4">
          <h4>Incoming Links</h4>

          <>
            <label className="label" htmlFor="createInLink">
              Source node
            </label>
            <div className="inline-flex space-x-1">
              <input
                className="input"
                type="text"
                id="sourceNodeInput"
                placeholder="Source node ID"
                value={sourceInput}
                onInput={(e) => setSourceInput(e.target.value)}
              ></input>
              <>
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    createLink(
                      graph.nodes.find((node) => targetInput === node.identity),
                      currNode
                    )
                  }
                >
                  Connect
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setConnectSelectionMode(!connectSelectionMode)}
                >
                  <MdLocationSearching></MdLocationSearching>
                </button>
              </>
            </div>
          </>
          {/* list of nodes connected through incoming links */}
          <ul>
            {currNode.inLinks.map((link, idx) => {
              // getting the node title
              // const connectedNode = () => {
              //   graph.nodes.find((node) => link === node.identity);
              //   console.log(node.title);
              //   return node.title;
              // };
              return (
                <li key={idx}>
                  <div className="p-1 mt-2 text-sm rounded-lg text-gray-dark bg-gray-lightest">
                    <span>{link}</span>
                    <button
                      type="button"
                      onClick={() => removeLink(link, currNode.identity)}
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        //===OUTGOING LINKS===//
        <div className="mt-4">
          <h4>Outgoing Links</h4>
          <>
            <label className="label" htmlFor="createOutLink">
              Target node
            </label>
            <div className="inline-flex space-x-1">
              <>
                <input
                  className="input"
                  type="text"
                  id="targetNodeInput"
                  placeholder="Target node ID"
                  value={targetInput}
                  onInput={(e) => setTargetInput(e.target.value)}
                ></input>
              </>
              <>
                <button
                  className="btn"
                  type="button"
                  onClick={() =>
                    createLink(
                      currNode,
                      graph.nodes.find((node) => targetInput === node.identity)
                    )
                  }
                >
                  Connect
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setConnectSelectionMode(!connectSelectionMode)}
                >
                  <MdLocationSearching></MdLocationSearching>
                </button>
              </>
            </div>
          </>
          {/* list of nodes connected through outgoing links */}
          <ul>
            {currNode.outLinks.map((link, idx) => {
              return (
                <div className="p-1 mt-2 text-sm rounded-lg text-gray-dark bg-gray-lightest">
                  <li key={idx}>
                    <span className="text-sm">{link}</span>
                    <button
                      className="text-sm"
                      type="button"
                      onClick={() => removeLink(currNode.identity, link)}
                    >
                      <MdDelete></MdDelete>
                    </button>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
