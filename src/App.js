import React, { useState, useEffect } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import { ForceGraph3D } from "react-force-graph";
import data from "./graphData.json";

function App() {
  const [graph, setGraph] = useState(data);

  const [currNode, setCurrNode] = useState({
    id: "",
    title: "",
    description: "",
    inEdges: [],
    outEdges: [],
  });

  const [editing, setEditing] = useState(false);

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
    // This will try and set graph to what is returned by graph.nodes.push(emptyNode)
    // Make sure to copy graph and add node
    const newGraph = { ...graph }
    newGraph.nodes.push(emptyNode)
    setGraph(newGraph);
  };

  const startSession = () => { };

  const editNode = () => {
    editing = setEditing(true);
  };

  const updateGraph = (e) => {
    // also need to make sure to update the edges
    //(maybe harder, possible easiest to remove all old edges and the insert the new ones)
    // setGraph()
    e.preventDefault();
    // currNode inEdges/outEdges may have changed, need to update links accordingly, the inEdges/outEdges will change for multiple nodes but only links including the changed edge.
    let newGraph = { ...graph };
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i]
      if (node.id === currNode.id) {
        newGraph["nodes"][i] = currNode
      }
    }

    for (let i = 0; i < graph["links"].length; i++) {
      const link = graph["links"][i]
      if (link["source"].id === currNode.id) {
        newGraph["links"][i]["source"] = currNode
      }
      if (link["target"].id === currNode.id) {
        newGraph["links"][i]["target"] = currNode
      }
    }
    setGraph(newGraph)
    setEditing(false)
  };

  const removeEdge = () => {
    console.log("trying to remove an edge")
  }

  // every time graph changes save the updated graph to file
  // BE CAREFUL if very big and changes often writing to file may cause your app to run slowly?? Something to watch out for may not be a problem
  // This useEffect block is only called when graph changes
  // useEffect(() => {
  // save new graph to file
  // jsonGraph = JSON.stringify(graph)
  //}, [graph])

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
      <div className="start-session-container">
        <button className="log-in" onClick={startSession}>
          Start Session
        </button>
      </div>
      <LeftPanel
        currNode={currNode}
        setCurrNode={setCurrNode}
        setEditing={setEditing}
        editing={editing}
        updateGraph={updateGraph}
        removeEdge={removeEdge}
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
