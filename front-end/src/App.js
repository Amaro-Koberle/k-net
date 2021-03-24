import React, { useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { uuid } from "uuidv4";
import axios from "axios";

// importing components
import SideBar from "./components/SideBar";
import Create from "./components/Create";
import StartSession from "./components/StartSession";

function App() {
  const [graph, setGraph] = useState({
    nodes: [],
    links: [],
  });

  // fetching the graph from the database
  useEffect(() => {
    const fetchGraph = async () => {
      const result = await axios("https://api.amarovega.net/example");
      setGraph(result.data);
    };

    fetchGraph();
  }, []);

  console.log(graph);

  // updating the graph
  const updateGraph = () => {
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

  // which node is currently selected?
  const [currNode, setCurrNode] = useState({
    id: "",
    title: "",
    description: "",
    inLinks: [],
    outLinks: [],
  });

  // selecting a node
  function handleNodeClick(node) {
    setCurrNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
    });
  }

  // is the user editing a node?
  const [editing, setEditing] = useState(false);

  // creating a new node
  const newNode = () => {
    const emptyNode = {
      id: uuid(),
      title: "Untitled",
      description: "",
      inLinks: [],
      outLinks: [],
    };
    const newGraph = { ...graph };
    newGraph.nodes.push(emptyNode);
    setGraph(newGraph);
  };

  // creating a link
  const createLink = (source, target) => {
    // check if input is valid
    // compare input to the node ids in currNode.inLinks and currnode.outLinks to see if the link is already present
    for (let i = 0; i < currNode.inLinks.length; i++) {
      if (source === currNode.inLinks[i]) {
        console.log(source, " is already a linked source node");
        return;
      }
    }
    for (let i = 0; i < currNode.outLinks.length; i++) {
      if (target === currNode.outLinks[i]) {
        console.log(target, " is already a linked target node");
        return;
      }
    }
    // compare input to all node ids and see if there is a match
    // for (let i = 0; i < graph["nodes"].length; i++) {
    //   if (source !== graph["nodes"][i].id) {
    //     console.log("input value is not an existing node");
    //     return;
    //   }
    // }

    // update currNode
    const newNode = { ...currNode };
    newNode.inLinks.push(source);
    newNode.outLinks.push(target);
    setCurrNode(newNode);
    // create newLink object
    const newLink = {
      source: source,
      target: target,
    };
    // add an entry to the links array
    const newGraph = { ...graph };
    newGraph.links.push(newLink);
    //update the graph
    setGraph(newGraph);
  };

  // removing a link
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
    for (let i = 0; i < newGraph["links"].length; i++) {
      const link = newGraph["links"][i];
      if (link.source.id === source && link.target.id === target) {
        newGraph.links.splice(i, 1);
      }
    }
    setGraph(newGraph);
  };

  //===GRAPH STYLING===//
  //nodes
  const nodeColor = "blue";
  const nodeOpacity = 1;
  const nodeLabel = "id";
  const enableNodeDrag = false;
  //links
  const linkColor = "#f4f4f4";
  const linkWidth = 1;
  const linkOpacity = 1;
  const inkDirectionalArrowLength = 7;
  const linkDirectionalParticles = 2;
  const linkDirectionalParticleWidth = 2;
  const linkCurvature = 0.5;
  //canvas
  const backgroundColor = "#383838";

  return (
    <>
      <ForceGraph3D
        graphData={graph}
        onNodeClick={handleNodeClick}
        enableNodeDrag={enableNodeDrag}
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
        backgroundColor={backgroundColor}
      />
      <StartSession />
      <Create newNode={newNode} />
      <SideBar
        currNode={currNode}
        setCurrNode={setCurrNode}
        setEditing={setEditing}
        editing={editing}
        updateGraph={updateGraph}
        createLink={createLink}
        removeLink={removeLink}
      />
    </>
  );
}

export default App;
