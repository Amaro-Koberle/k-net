import React from "react";

export default function LeftPanel({ currNode, setCurrNode, updateGraph }) {
  return (
    <div className="left-panel">
      {/* I want the following form to replace whatever
        is displayed in the left panel when the Edit button
        is clicked, but I've got no clue on how to do that.
        
        <div className="menu-header">
          <h3>Edit Node</h3>
          <button className="exit-button">X</button>
        </div>*/}
      <form className="edit-node">
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
        <label for="in">In</label>
        <input
          type="text"
          id="in"
          value={currNode.inEdges}
          onInput={(e) => setCurrNode({ ...currNode, inEdges: e.target.value })}
        ></input>
        <label for="out">Out</label>
        <input
          type="text"
          id="out"
          value={currNode.outEdges}
          onInput={(e) =>
            setCurrNode({ ...currNode, outEdges: e.target.value })
          }
        ></input>
        <button type="submit" onClick={updateGraph}>
          Save
        </button>
      </form>
      <div className="menu-header">
        <h3>{currNode.title}</h3>
        <button className="edit-button">Edit</button>
      </div>
      <form className="node-display">
        <p>{currNode.description}</p>
        <h5>In</h5>
        <ul>
          {currNode.inEdges.map((edge) => (
            <li>{edge}</li>
          ))}
        </ul>
        <h5>Out</h5>
        <ul>
          {currNode.outEdges.map((edge) => (
            <li>{edge}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}
