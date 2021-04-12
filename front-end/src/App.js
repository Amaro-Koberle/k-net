import React, { useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { v4 } from "uuid";
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
      const result = await axios("http://localhost:8000/graph");
      setGraph(result.data);
    };

    fetchGraph();
  }, []);

  // updating the graph
  const updateGraph = async () => {
    let newGraph = { ...graph };
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.identity === currNode.identity) {
        newGraph["nodes"][i] = currNode;
      }
    }

    for (let i = 0; i < graph["links"].length; i++) {
      const link = graph["links"][i];
      if (link["source"].identity === currNode.identity) {
        newGraph["links"][i]["source"] = currNode;
      }
      if (link["target"].identity === currNode.identity) {
        newGraph["links"][i]["target"] = currNode;
      }
    }

    // sending the post request to the back-end
    try {
      const result = await axios.put(
        "http://localhost:8000/update-node",
        currNode
      );
      setGraph(newGraph);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // which node is currently selected?
  const [currNode, setCurrNode] = useState({
    identity: "",
    title: "",
    description: "",
    inLinks: [],
    outLinks: [],
  });

  // selecting a node
  function handleNodeClick(node) {
    setCurrNode({
      identity: node.identity,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
    });
  }

  // is the user editing a node?
  const [editing, setEditing] = useState(false);

  // creating a new node
  const newNode = async () => {
    const emptyNode = {
      identity: v4(),
      title: "Untitled",
      description: "",
      inLinks: [],
      outLinks: [],
    };
    const newGraph = { ...graph };
    newGraph.nodes.push(emptyNode);
    // sending the post request to the back-end
    try {
      const result = await axios.post(
        "http://localhost:8000/add-node",
        emptyNode
      );
      setGraph(newGraph);
    } catch (error) {
      console.error(error);
    }
  };

  // deleting a node
  const deleteNode = async (nodeidentity) => {
    let newGraph = { ...graph };
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.identity === nodeidentity) {
        newGraph["nodes"].splice(i, 1);
        // sending the delete request to the back-end
        try {
          const result = await axios.delete(
            "http://localhost:8000/delete-node",
            {
              data: { identity: currNode.identity },
            }
          );
          console.log(currNode);
          setGraph(newGraph);
          setEditing(false);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // creating a Link
  const createLink = (sourceNode, targetNode) => {
    if (targetNode === undefined) {
      console.log("target node is not valid");
      return;
    }

    targetNode.inLinks.push(sourceNode.identity);
    sourceNode.outLinks.push(targetNode.identity);
    const newLink = { source: sourceNode, target: targetNode };

    const newGraph = { ...graph };
    newGraph.links.push(newLink);
    setGraph(newGraph);
  };

  // removing a link
  const removeLink = (source, target) => {
    const newGraph = { ...graph };
    // remove the outLink from the source
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.identity === source) {
        const outLinkIdx = node.outLinks.indexOf(target);
        node.outLinks.splice(outLinkIdx, 1);
      }
    }
    // remove the inLink from the target
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.identity === target) {
        const inLinkIdx = node.inLinks.indexOf(source);
        node.inLinks.splice(inLinkIdx, 1);
      }
    }
    // remove the edge where inLink and outLink match
    for (let i = 0; i < newGraph["links"].length; i++) {
      const link = newGraph["links"][i];
      if (link.source.identity === source && link.target.identity === target) {
        newGraph.links.splice(i, 1);
      }
    }
    setGraph(newGraph);
  };

  //===GRAPH STYLING===//
  //nodes
  const nodeColor = "blue";
  const nodeOpacity = 1;
  const nodeLabel = "title";
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
        graph={graph}
        currNode={currNode}
        setCurrNode={setCurrNode}
        setEditing={setEditing}
        editing={editing}
        updateGraph={updateGraph}
        createLink={createLink}
        removeLink={removeLink}
        deleteNode={deleteNode}
      />
    </>
  );
}

export default App;
