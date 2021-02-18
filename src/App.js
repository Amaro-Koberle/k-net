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
          <label for="content">Content</label>
          <input type="text" id="content"></input>
        </form>
      </div>
      <div>
        <ForceGraph3D graphData={data} />
      </div>
    </>
  );
}

export default App;
