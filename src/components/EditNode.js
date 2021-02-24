import React from "react";

export default function EditNode({
  currNode,
  setCurrNode,
  editing,
  setEditing,
  updateGraph,
  removeEdge,
}) {
  if (editing === false) return null;

  return (
    <div>
      <div className="menu-header">
        <h3>Edit Node</h3>
        <button className="exit-button" onClick={() => setEditing(false)}>
          X
        </button>
      </div>
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
        <ul>
          {currNode.inEdges.map((edge) => {
            return (
              <li>
                <span>{edge}</span>
                <button onClick={removeEdge}>Remove</button>
              </li>
            );
          })}
        </ul>
        <label for="out">Out</label>
        <ul>
          {currNode.outEdges.map((edge) => {
            return (
              <li>
                <span>{edge}</span>
                <button onClick={removeEdge}>Remove</button>
              </li>
            );
          })}
        </ul>
        <button type="submit" onClick={updateGraph}>
          Save
        </button>
      </form>
    </div>
  );
}
