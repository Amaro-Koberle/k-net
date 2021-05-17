import React, { useState, useEffect } from "react";
import nipplejs from "nipplejs";
import { ForceGraph3D } from "react-force-graph";
import { v4 } from "uuid";
import axios from "axios";

// importing components
import Panel from "./components/Panel";
import CreateNode from "./components/CreateNode";
import Search from "./components/Search";

// importing hooks
import useWidth from "./hooks/useWidth";

export default function App() {
  //==================================================================================
  // STYLING
  //==================================================================================

  // color palette
  const grayDarkest = "#1a1a1a";
  const grayDarker = "#2a2a2a";
  const grayDark = "#3b3b3b";
  const gray = "#4f4f4f";
  const grayLight = "#777777";
  const grayLighter = "#a7a7a7";
  const grayLightest = "#e6e6e6";

  // graph colors
  const defaultNodeColor = grayLight;
  const focusedNodeColor = grayLightest;
  const defaultLinkColor = grayLight;
  const backgroundColor = grayDarkest;

  // nodes
  const nodeOpacity = 1;
  const enableNodeDrag = false;

  // links
  const linkWidth = 1;
  const linkOpacity = 1;
  const inkDirectionalArrowLength = 7;
  const linkDirectionalParticles = 2;
  const linkDirectionalParticleWidth = 2;

  // using the useWidth hook
  const width = useWidth();

  useEffect(() => {
    // set current breakpoint
    if (width >= 1536) {
      setBreakpoint(5); // 2xl
    } else if (width >= 1280) {
      setBreakpoint(4); // xl
    } else if (width >= 1024) {
      setBreakpoint(3); // lg
    } else if (width >= 768) {
      setBreakpoint(2); // md
    } else if (width >= 640) {
      setBreakpoint(1); // sm
    } else {
      setBreakpoint(0);
    }
  }, [width]);

  //==================================================================================
  // INITIALISING STATE
  //==================================================================================

  // at what breakpoint (width) is the app currently being rendered?
  const [breakpoint, setBreakpoint] = useState(0);

  // what nodes and links are currently in the graph?
  const [graph, setGraph] = useState({
    nodes: [],
    links: [],
  });

  // what's in the currently focused node?
  const [focusedNode, setFocusedNode] = useState({
    id: "",
    title: "",
    description: "",
    inLinks: [],
    outLinks: [],
    color: defaultNodeColor,
    author: "",
    creationDate: "",
  });

  // what nodes are currently selected?
  const [selection, setSelection] = useState([]);

  // is the user currently editing a node?
  const [editingNode, setEditingNode] = useState(false);

  //==================================================================================
  // APP LOGIC
  //==================================================================================

  // updating the graph
  const updateGraph = () => {
    let newGraph = { ...graph };
    // updating the nodes
    for (let i = 0; i < graph["nodes"].length; i++) {
      const node = graph["nodes"][i];
      if (node.id === focusedNode.id) {
        newGraph["nodes"][i] = focusedNode;
      }
    }
    // updating the links
    for (let i = 0; i < graph["links"].length; i++) {
      const link = graph["links"][i];
      if (link["source"].id === focusedNode.id) {
        newGraph["links"][i]["source"] = focusedNode;
      }
      if (link["target"].id === focusedNode.id) {
        newGraph["links"][i]["target"] = focusedNode;
      }
    }

    setGraph(newGraph);
  };

  // handling node clicks
  const handleNodeClick = (node) => {
    //reset node color back to default (unfocused) color
    const newNode = { ...focusedNode };
    newNode.color = defaultNodeColor;
    setFocusedNode(newNode);

    // updating focusedNode
    setFocusedNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
      author: node.author,
      creationDate: node.creationDate,
      color: focusedNodeColor,
    });

    // changing selection
    const newSelection = [...selection];
    newSelection.unshift(node);
    setSelection(newSelection);
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

  //==================================================================================
  // API CALLS
  //==================================================================================

  // fetching the graph from the database everytime the app reloads
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const result = await axios("http://localhost:8000/graph");
        const newGraph = result.data;
        setGraph(newGraph);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGraph();
  }, []);

  // updating the database with every change of the graph
  useEffect(() => {
    const updateDataBase = async () => {
      try {
        const result = await axios.put(
          "http://localhost:8000/update-node",
          focusedNode
        );
      } catch (error) {
        console.error(error);
      }
    };

    updateDataBase();
  }, [graph]);

  // creating a node
  const createNode = async () => {
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
      //const result =
      await axios.post("http://localhost:8000/add-node", emptyNode);
      const newGraph = { ...graph, nodes: [...graph.nodes, emptyNode] };
      setGraph(newGraph);
      setFocusedNode(emptyNode);
      setEditingNode(true);
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
              data: { id: focusedNode.id },
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
    if (targetNode === undefined) {
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
      const newGraph = { ...graph };
      newGraph.links.push(newLink);
      setGraph(newGraph);
    } catch (error) {
      console.error(error);
    }
  };

  //==================================================================================
  // RENDERING
  //==================================================================================

  return (
    <div className="text-gray-lightest">
      <>
        <ForceGraph3D
          showNavInfo={false}
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
        <Search />
        <CreateNode createNode={createNode} />
        <Panel
          editingNode={editingNode}
          setEditingNode={setEditingNode}
          deleteNode={deleteNode}
          updateGraph={updateGraph}
          breakpoint={breakpoint}
          handleNodeClick={handleNodeClick}
          graph={graph}
          focusedNode={focusedNode}
          setFocusedNode={setFocusedNode}
          createLink={createLink}
          removeLink={removeLink}
          selection={selection}
        />
      </>
    </div>
  );
}
