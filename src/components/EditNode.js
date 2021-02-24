import React from "react";

export default function EditNode({
  currNode,
  setCurrNode,
  editing,
  setEditing,
  updateGraph,
}) {
  if (editing === false) return null;

  return (
    <div>
      <div className="menu-header">
        <h3>Edit Node</h3>
        <button className="exit-button" onClick={setEditing(false)}>
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
    </div>
  );
}
