import React, { useState } from "react";
import "./App.css";
import { ForceGraph3D } from "react-force-graph";
import data from "./graphData.json";

function App() {
  const [currNode, setCurrNode] = useState({
    title: "Node example",
    description: "Node Description... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    inEdges: ["Source node 1", "Source node 2", "Source node 3"],
    outEdges: ["Target node 1", "Target node 2", "Target node 3"]
  })
  const [graph, setGraph] = useState(data)

  // I want the content of a node to be be displayed in the
  //left panel whenever it is clicked. No idea how...
  const handleNodeClick = (node, e) => {
    setCurrNode({
      title: node.title,
      description: node.description,
      inEdges: node.inEdges,
      outEdges: node.outEdges,
    })
  };

  const updateGraph = () => {
    // let newGraph = { ...graph };
    // (add id field to currNode)
    // update node in graph (find node and set it to be a copy of currNode)
    // also need to make sure to update the edges (maybe harder, possible easiest to remove all old edges and the insert the new ones)
    // setGraph()
  }

  return (
    <>
      <div className="button-container">
        <button className="add-node">New Node</button>
      </div>

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
          <input type="text" id="title" value={currNode.title} onInput={(e) => setCurrNode({ ...currNode, title: e.target.value })}></input>
          <label for="description">Description</label>
          <input type="text" id="content" value={currNode.description} onInput={(e) => setCurrNode({ ...currNode, description: e.target.value })}></input>
          <label for="in">In</label>
          <input type="text" id="in" value={currNode.inEdges} onInput={(e) => setCurrNode({ ...currNode, inEdges: e.target.value })}></input>
          <label for="out">Out</label>
          <input type="text" id="out" value={currNode.outEdges} onInput={(e) => setCurrNode({ ...currNode, outEdges: e.target.value })}></input>
          <button type="submit" onClick={updateGraph}>Save</button>
        </form>
        <div className="menu-header">
          <h3>{currNode.title}</h3>
          <button className="edit-button">Edit</button>
        </div>
        <form className="node-display">
          <p>
            {currNode.description}
          </p>
          <h5>In</h5>
          <ul>
            {currNode.inEdges.map((edge) => <li>{edge}</li>)}
          </ul>
          <h5>Out</h5>
          <ul>
            {currNode.outEdges.map((edge) => <li>{edge}</li>)}
          </ul>
        </form>
      </div>

      <div>
        <ForceGraph3D graphData={graph} onNodeClick={handleNodeClick} />
      </div>
    </>
  );
}

export default App;
