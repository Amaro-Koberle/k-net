import React from "react";

export default function Create({ newNode }) {
  return (
    <div className="new-node-container">
      <button className="new-node" onClick={newNode}>
        New Node
      </button>
    </div>
  );
}
