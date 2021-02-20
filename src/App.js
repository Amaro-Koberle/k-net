import React, { useState } from "react";
import "./App.css";
import { ForceGraph3D } from "react-force-graph";
import data from "./graphData.json";

function App() {
  // I want the content of a node to be be displayed in the
  //left panel whenever it is clicked. No idea how...
  const handleNodeClick = (e) => {
    console.log("click");
  };

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
        </div>
        <form className="edit-node">
          <label for="in">In</label>
          <input type="text" id="in"></input>
          <label for="out">Out</label>
          <input type="text" id="out"></input>
          <label for="title">Title</label>
          <input type="text" id="title"></input>
          <label for="description">Description</label>
          <input type="text" id="content"></input>
        </form> */}
        <div className="menu-header">
          <h3>Node Title</h3>
          <button className="edit-button">Edit</button>
        </div>
        <form className="node-display">
          <p>
            Node Description... Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h5>In</h5>
          <ul>
            <li>Source Node 1</li>
            <li>Source Node 2</li>
            <li>Source Node 3</li>
          </ul>
          <h5>Out</h5>
          <ul>
            <li>Target Node 1</li>
            <li>Target Node 2</li>
            <li>Target Node 3</li>
          </ul>
        </form>
      </div>

      <div>
        <ForceGraph3D graphData={data} onNodeClick={handleNodeClick} />
      </div>
    </>
  );
}

export default App;
