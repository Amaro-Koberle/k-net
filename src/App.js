import React, { useState, useEffect } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel";
import { ForceGraph3D } from "react-force-graph";
import data from "./graphData.json";
import { uuid } from "uuidv4";
import axios from "axios";

function App() {
  const [graph, setGraph] = useState(data);

  const [currNode, setCurrNode] = useState({
    id: "",
    title: "",
    description: "",
    inLinks: [],
    outLinks: [],
  });

  // Is the user editing a node?
  // This state handles the content of the Left Panel.
  // If the user is editing a node, the Left Panel displays a form.
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchGraph = async () => {
      const result = await axios("http://localhost:8000/example");
      console.log(result.data)
      // setGraph(result.data)
    }

    fetchGraph()
  }, [])

  function handleNodeClick(node, e) {
    setCurrNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
    });
  }

  // Creating a new node.
  // This function is called upon clicking the "New Node" button.
  const newNode = () => {
    const emptyNode = {
      id: uuid(),
      title: "",
      description: "",
      inLinks: [],
      outLinks: [],
    };
    // This will try and set graph to what is returned by graph.nodes.push(emptyNode)
    // Make sure to copy graph and add node
    const newGraph = { ...graph };
    newGraph.nodes.push(emptyNode);
    setGraph(newGraph);
  };

  const startSession = () => { };

  const updateGraph = () => {
    // also need to make sure to update the links
    //(maybe harder, possible easiest to remove all old links and then insert the new ones)
    // setGraph()
    // currNode inLinks/outLinks may have changed, need to update links accordingly, the inLinks/outLinks will change for multiple nodes but only links including the changed link.
    let newGraph = { ...graph };
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === currNode.id) {
        newGraph["nodes"][i] = currNode;
      }
    }

    for (let i = 0; i < graph["links"].length; i++) {
      const link = graph["links"][i];
      if (link["source"].id === currNode.id) {
        newGraph["links"][i]["source"] = currNode;
      }
      if (link["target"].id === currNode.id) {
        newGraph["links"][i]["target"] = currNode;
      }
    }
    setGraph(newGraph);
    setEditing(false);
  };

  const removeLink = (source, target) => {
    const newGraph = { ...graph };
    // remove the outLink from the source
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === source) {
        const outLinkIdx = node.outLinks.indexOf(target);
        node.outLinks.splice(outLinkIdx, 1);
      }
    }
    // remove the inLink from the target
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === target) {
        const inLinkIdx = node.inLinks.indexOf(source);
        node.inLinks.splice(inLinkIdx, 1);
      }
    }
    // remove the edge where inLink and outLink match
    // note by Amaro:
    // I assume you mean where source and target match,
    // because the link objects don't have any inLink or outLink keys.
    // Also, eventually I'll want it to be possible for links to loop
    // from a node back into the same node, so this is a temporary solution
    //... also, this shit don't work... no clue why.
    for (let i = 0; i < newGraph["links"].length; i++) {
      const link = newGraph["links"][i];
      if (link.source === link.target) {
        console.log("trying to remove link");
        newGraph.links.splice(i, 1);
      }
    }
    setGraph(newGraph);
  };

  useEffect(() => {
    //console.log(graph);
  }, [graph]);
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
  const nodeLabel = "id";
  //links
  const linkColor = "green";
  const linkWidth = 1;
  const linkOpacity = 1;
  const inkDirectionalArrowLength = 7;
  const linkDirectionalParticles = 2;
  const linkDirectionalParticleWidth = 2;
  const linkCurvature = 0;

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
        removeLink={removeLink}
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
        nodeLabel={nodeLabel}
        linkColor={linkColor}
        linkWidth={linkWidth}
        linkOpacity={linkOpacity}
        linkDirectionalArrowLength={inkDirectionalArrowLength}
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={linkDirectionalParticleWidth}
        linkCurvature={linkCurvature}
      />
    </>
  );
}

export default App;
