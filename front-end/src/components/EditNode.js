import React from "react";
import { useState } from "react";

export default function EditNode({
  currNode,
  setCurrNode,
  editing,
  setEditing,
  updateGraph,
  createLink,
  removeLink,
}) {
  if (editing === false) return null;
  const [sourceInput, setSourceInput] = useState("");
  const [targetInput, setTargetInput] = useState("");

  return (
    <div>
      <div className="menu-header">
        <h3>Edit Node</h3>
        <button className="exit-button" onClick={() => setEditing(false)}>
          X
        </button>
      </div>
      <form className="edit-node">
        <h4>In</h4>
        <div>
          <label for="createInLink">Source</label>
          <input
            type="text"
            id="createInLink"
            placeholder="Source node ID"
            value={sourceInput}
            onInput={(e) => setSourceInput(e.target.value)}
          ></input>
          <button
            type="button"
            onClick={() => createLink(sourceInput, currNode.id)}
          >
            Connect
          </button>
        </div>
        <ul>
          {currNode.inLinks.map((link) => {
            return (
              <li>
                <span>{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(link, currNode.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <h4>Out</h4>
        <div>
          <label for="createOutLink">Target</label>
          <input
            type="text"
            id="createOutLink"
            placeholder="Target node ID"
            value={targetInput}
            onInput={(e) => setTargetInput(e.target.value)}
          ></input>
          <button
            type="button"
            onClick={() => createLink(currNode.id, targetInput)}
          >
            Connect
          </button>
        </div>
        <ul>
          {currNode.outLinks.map((link) => {
            return (
              <li>
                <span>{link}</span>
                <button
                  type="button"
                  onClick={() => removeLink(currNode.id, link)}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          value={currNode.title}
          onInput={(e) => setCurrNode({ ...currNode, title: e.target.value })}
        ></input>
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          value={currNode.description}
          onInput={(e) =>
            setCurrNode({ ...currNode, description: e.target.value })
          }
        ></input>
        <button type="button" onClick={updateGraph}>
          Save
        </button>
      </form>
    </div>
  );
}
