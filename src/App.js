import React, { useState } from "react";
import "./App.css";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR,
} from "react-force-graph";
import data from "./graphData.json";

function App() {
  return (
    <>
      <div className="button-container">
        <button className="add-node">New Node</button>
      </div>

      <div className="left-panel">
        {/* <div className="menu-header">
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
          <label for="content">Content</label>
          <input type="text" id="content"></input>
        </form>*/}
        <div className="menu-header">
          <h3>Node Title</h3>
          <button className="edit-button">Edit</button>
        </div>
        <form className="node-display">
          <h5>Node Title</h5>

          <p>
            Node Content... Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <h5>In</h5>
          <ul>
            <li>Origin Node 1</li>
            <li>Origin Node 2</li>
            <li>Origin Node 3</li>
          </ul>
          <h5>Out</h5>
          <ul>
            <li>Destination Node 1</li>
            <li>Destination Node 2</li>
            <li>Destination Node 3</li>
          </ul>
        </form>
      </div>
      <div>
        <ForceGraph3D graphData={data} />
      </div>
    </>
  );
}

export default App;
