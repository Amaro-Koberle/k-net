import React from "react";

export default function NodeDisplay({ currNode, editing, setEditing }) {
  if (editing === true) return null;

  return (
    <div>
      <div className="menu-header">
        <h3>{currNode.title}</h3>
        <button className="edit-button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </div>
      <form className="node-display">
        <p>{currNode.description}</p>
        <h5>In</h5>
        <ul>
          {currNode.inLinks.map((link) => (
            <li>{link}</li>
          ))}
        </ul>
        <h5>Out</h5>
        <ul>
          {currNode.outLinks.map((link) => (
            <li>{link}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}
