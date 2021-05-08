import React, { useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { v4 } from "uuid";
import axios from "axios";

// importing components
import Pane from "./components/Pane";
import Create from "./components/Create";
import StartSession from "./components/StartSession";

// importing hooks
import useWidth from "./hooks/useWidth";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  //===/ GRAPH STYLING /===//
  // colors
  const defaultNodeColor = "#949494";
  const selectedNodeColor = "white";
  const focusedNodeColor = "white";
  const defaultLinkColor = "#949494";
  const backgroundColor = "#383838";

  // nodes
  const nodeOpacity = 1;
  const enableNodeDrag = false;

  // links
  const linkWidth = 1;
  const linkOpacity = 1;
  const inkDirectionalArrowLength = 7;
  const linkDirectionalParticles = 2;
  const linkDirectionalParticleWidth = 2;

  //===/ APP LOGIC /===//
  // initialising the graph
  const [graph, setGraph] = useState({
    nodes: [],
    links: [],
  });

  // initialising the currently focused node
  const [currNode, setCurrNode] = useState({
    id: "",
    title: "",
    description: "",
    inLinks: [],
    outLinks: [],
    color: defaultNodeColor,
    author: "",
    creationDate: "",
  });

  // initialising selection
  const [selection, setSelection] = useState([]);

  // using the useWidth hook
  const width = useWidth();

  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const breakpoints = ["sm", "md", "lg", "xl", "2xl"];
    // set current breakpoint
    if (width >= 1536) {
      setBreakpoint(breakpoints[4]);
    } else if (width >= 1280) {
      setBreakpoint(breakpoints[3]);
    } else if (width >= 1024) {
      setBreakpoint(breakpoints[2]);
    } else if (width >= 768) {
      setBreakpoint(breakpoints[1]);
    } else if (width >= 640) {
      setBreakpoint(breakpoints[0]);
    } else {
      setBreakpoint("");
    }
    console.log(breakpoint);
    console.log(width);
  }, [width]);

  // fetching the graph everytime the app reloads
  useEffect(() => {
    // fetching the graph from the database
    const fetchGraph = async () => {
      try {
        const result = await axios("http://localhost:8000/graph");
        const newGraph = result.data;
        console.log("fetching graph");
        console.log(newGraph);
        setGraph(newGraph);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGraph();
  }, []);

  // updating the graph
  const updateGraph = () => {
    let newGraph = { ...graph };
    // updating the nodes
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === currNode.id) {
        newGraph["nodes"][i] = currNode;
      }
    }
    // updating the links
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
  };

  // update the graph with every change of currNode
  useEffect(() => {
    updateGraph();
  }, [currNode]);

  // upload graph to the database
  const putGraph = () => {
    updateNode();
  };

  // update node
  const updateNode = async () => {
    try {
      const result = await axios.put(
        "http://localhost:8000/update-node",
        currNode
      );
    } catch (error) {
      console.error(error);
    }
  };

  // update the database with every change of the graph
  useEffect(() => {
    putGraph();
  }, [graph]);

  // handling node clicks
  const handleNodeClick = (node) => {
    //changing color back to gray
    const newNode = { ...currNode };
    newNode.color = "#949494";
    setCurrNode(newNode);

    // updating currNode
    setCurrNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
      author: node.author,
      creationDate: node.creationDate,
      color: "white",
    });

    // changing selection
    const newSelection = [...selection];
    newSelection.unshift(node);
    setSelection(newSelection);
  };

  // is the user editing a node?
  const [editing, setEditing] = useState(false);

  // creating a node
  const newNode = async () => {
    const emptyNode = {
      id: v4(),
      title: "Untitled",
      description: "",
      inLinks: [],
      outLinks: [],
      color: defaultNodeColor,
      author: "",
      creationDate: "",
    };
    // sending the post request to the back-end
    try {
      const result = await axios.post(
        "http://localhost:8000/add-node",
        emptyNode
      );
      const newGraph = { ...graph };
      newGraph.nodes.push(emptyNode);
      setGraph(newGraph);
      setCurrNode(emptyNode);
    } catch (error) {
      console.error(error);
    }
  };

  // deleting a node
  const deleteNode = async (nodeid) => {
    let newGraph = { ...graph };
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === nodeid) {
        newGraph["nodes"].splice(i, 1);
        // sending the delete request to the back-end
        try {
          const result = await axios.delete(
            "http://localhost:8000/delete-node",
            {
              data: { id: currNode.id },
            }
          );
          setGraph(newGraph);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // creating a link
  const createLink = async (sourceNode, targetNode) => {
    console.log(sourceNode);
    console.log(targetNode);
    if (targetNode === undefined) {
      console.log("target node is not valid");
      return;
    }

    // calculate the link curvature
    const curvature = 1;

    // calculate the link rotation
    const rotation = Math.random();

    // updating inLinks and outLinks in source and target nodes
    sourceNode.outLinks.push(targetNode.id);
    targetNode.inLinks.push(sourceNode.id);

    // creating the link object
    const newLink = {
      source: sourceNode,
      target: targetNode,
      curvature: curvature,
      rotation: rotation,
      title: "",
      description: "",
      author: "",
      color: defaultLinkColor,
      creationDate: "",
    };

    // sending the post request to the back-end
    try {
      const result = await axios.post(
        "http://localhost:8000/add-link",
        newLink
      );
      console.log(newLink);
      const newGraph = { ...graph };
      newGraph.links.push(newLink);
      setGraph(newGraph);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      <ForceGraph3D
        width={width}
        graphData={graph}
        onNodeClick={handleNodeClick}
        enableNodeDrag={enableNodeDrag}
        nodeColor="color"
        nodeOpacity={nodeOpacity}
        nodeLabel="title"
        linkColor="color"
        linkWidth={linkWidth}
        linkOpacity={linkOpacity}
        linkDirectionalArrowLength={inkDirectionalArrowLength}
        linkDirectionalParticles={linkDirectionalParticles}
        linkDirectionalParticleWidth={linkDirectionalParticleWidth}
        linkCurvature="curvature"
        linkCurveRotation="rotation"
        backgroundColor={backgroundColor}
      />
      <AuthProvider>
        <StartSession />
      </AuthProvider>
      <Create newNode={newNode} />
      <Pane
        handleNodeClick={handleNodeClick}
        graph={graph}
        currNode={currNode}
        setCurrNode={setCurrNode}
        setEditing={setEditing}
        editing={editing}
        updateGraph={updateGraph}
        createLink={createLink}
        removeLink={removeLink}
        deleteNode={deleteNode}
        selection={selection}
      />
    </>
  );
}

export default App;
