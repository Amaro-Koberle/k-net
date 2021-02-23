import React, { useState } from "react";
import "../App.css";
import LeftPanel from "./LeftPanel";
import { ForceGraph3D } from "react-force-graph";
import data from "../graphData.json";

function App() {
  const [graph, setGraph] = useState(data);

  const [currNode, setCurrNode] = useState({
    id: "",
    title: "",
    description: "",
    inEdges: [],
    outEdges: [],
  });

  function handleNodeClick(node, e) {
    setCurrNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inEdges: node.inEdges,
      outEdges: node.outEdges,
    });
  }

  const newNode = () => {
    //Question: What is the difference between declaring the function
    //the way I did it in the line above, and doing it as follows:
    //function newNode() {};
    //or like this:
    //const newNode = function() {};
    //? When should I use which way of doing it? Does it even matter?
    //
    //This code is useless right now, it just wipes the page clean.
    const emptyNode = {
      id: 999, //I have to figure out a function that appends a unique ID here
      title: "",
      description: "",
      inEdges: [],
      outEdges: [],
    };
    setGraph(graph.nodes.push(emptyNode));
  };

  const logIn = () => {};

  const signUp = () => {};

  const updateGraph = (e) => {
    // let newGraph = { ...graph };
    // (add id field to currNode)
    // update node in graph (find node and set it to be a copy of currNode)
    // also need to make sure to update the edges
    //(maybe harder, possible easiest to remove all old edges and the insert the new ones)
    // setGraph()
    e.preventDefault();
    let newGraph = { ...graph };
    const newGraphEntries = Object.entries(newGraph.nodes);
    const currNodeEntries = Object.entries(currNode);
    console.log(currNodeEntries, newGraphEntries);
    //newGraphEntries and currNodeEntries are currently not structured the same way.
    //
    const newGraphEntriesLength = newGraphEntries.length;
    for (i = 0; i < newGraphEntriesLength; i++) {
      if (newGraphEntries[i] === currNodeEntries) {
        newGraphEntries[i] = currNodeEntries;
      }
    }
  };

  //GRAPH STYLING
  //nodes
  const nodeColor = "blue";
  const nodeOpacity = 1;
  //links
  const linkColor = "green";
  const linkWidth = 1;
  const linkOpacity = 1;
  const inkDirectionalArrowLength = 7;
  const linkDirectionalParticles = 2;
  const linkDirectionalParticleWidth = 2;

  return (
    <>
      <div className="start-session">
        <button className="log-in" onClick={logIn}>
          Log In
        </button>
        <button className="sign-up" onClick={signUp}>
          Sign Up
        </button>
      </div>
      <LeftPanel
        currNode={currNode}
        setCurrNode={setCurrNode}
        updateGraph={updateGraph}
      />
      <div className="new-node-container">
        <button className="new-node" onClick={newNode}>
          New Node
        </button>
      </div>
      <ForceGraph3D
        graphData={graph}
        onNodeClick={handleNodeClick}
        nodeColor={nodeColor}
        nodeOpacity={nodeOpacity}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkOpacity={linkOpacity}
        linkDirectionalArrowLength={inkDirectionalArrowLength}
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={linkDirectionalParticleWidth}
      />
    </>
  );
}

export default App;
