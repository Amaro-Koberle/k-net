import React, { useState, useEffect } from "react";
import { ForceGraph3D } from "react-force-graph";
import { v4 } from "uuid";
import axios from "axios";

import { CSS2DRenderer, CSS2DObject } from "three-css2drender";

// importing components
import Panel from "./components/Panel";
import Search from "./components/Search";
import Menu from "./components/Menu";
import BottomButtons from "./components/BottomButtons";

// importing hooks
import useWidth from "./hooks/useWidth";
import { useAuth } from "./contexts/AuthContext";

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

  const primaryDarkest = "#1d1a1b";
  const primaryDarker = "#2e2929";
  const primaryDark = "#3f3c3b";
  const primary = "#53514f";
  const primaryLight = "#7b807d";
  const primaryLighter = "#b0b6b4";
  const primaryLightest = "#e3eae9";

  const secondaryDarkest = "#2b1629";
  const secondaryDarker = "#4c2439";
  const secondaryDark = "#80314f";
  const secondary = "#bd466d";
  const secondaryLight = "#ff637d";
  const secondaryLighter = "#ff9d90";
  const secondaryLightest = "#feddbf";

  const tertiaryDarkest = "#142b34";
  const tertiaryDarker = "#143b3e";
  const tertiaryDark = "#0f5855";
  const tertiary = "#2a7f76";
  const tertiaryLight = "#41c0a7";
  const tertiaryLighter = "#76e9af";
  const tertiaryLightest = "#dbffc1";

  // graph colors
  const defaultNodeColor = primaryLight;
  const focusedNodeColor = primaryLightest;
  const defaultLinkColor = primaryLight;
  const backgroundColor = primaryDarkest;

  // nodes
  const nodeOpacity = 1;

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

  // what user is currently logged in?
  const { currentUser } = useAuth();

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
    visibility: "",
    prizeAmount: "",
    prizeCondition: "",
    createdOn: 0,
    lastEditedOn: 0,
  });

  // what nodes are currently selected?
  const [selection, setSelection] = useState([]);

  // is the user currently editing a node?
  const [editingNode, setEditingNode] = useState(false);

  // is the user trying to log in rather than signing up?
  const [hasAccount, setHasAccount] = useState(false);

  // is the main menu currently being displayed?
  const [displayMenu, setDisplayMenu] = useState(false);

  // is the panel currently hidden?
  const [panelHidden, setPanelHidden] = useState(false);

  const { currentUser } = useAuth();

  //==================================================================================
  // APP LOGIC
  //==================================================================================

  // TODO get the CSS2DRenderer to work
  const extraRenderers = new CSS2DRenderer();

  // updating the graph after submitting node edits
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
    updateDataBase();
  };

  // handling node clicks
  const handleNodeClick = (node) => {
    const newNode = { ...focusedNode };
    setFocusedNode(newNode);

    // updating focusedNode
    setFocusedNode({
      id: node.id,
      title: node.title,
      description: node.description,
      inLinks: node.inLinks,
      outLinks: node.outLinks,
      author: node.author,
      color: node.color,
      visibility: node.visibility,
      prizeAmount: node.prizeAmount,
      prizeCondition: node.prizeCondition,
      createdOn: node.createdOn,
      lastEditedOn: node.lastEditedOn,
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
    updateDataBase();
  };

  //==================================================================================
  // API CALLS
  //==================================================================================

  // flip to true in order to direct all API calls to the AWS server
  const directingCallsToAWS = false;

  // fetching the graph from the database everytime the app reloads
  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const result = directingCallsToAWS
          ? await axios("https://api.amarovega.net/graph")
          : await axios("http://localhost:8000/graph");
        const newGraph = result.data;
        setGraph(newGraph);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGraph();
  }, []);

  // updating the focused node on the database
  const updateDataBase = async () => {
    try {
      const result = directingCallsToAWS
        ? await axios.put("https://api.amarovega.net/update-node", focusedNode)
        : await axios.put("http://localhost:8000/update-node", focusedNode);
    } catch (error) {
      console.error(error);
    }
  };

  // creating a node
  const createNode = async () => {
    const emptyNode = {
      id: v4(),
      title: "",
      description: "",
      inLinks: [],
      outLinks: [],
      color: defaultNodeColor,
      author: currentUser.uid,
      visibility: "",
      // TODO track prize amount
      prizeAmount: "",
      prizeCondition: "",
      createdOn: Date.now(),
      lastEditedOn: 0,
    };

    // sending the post request to the back-end
    try {
      const result = directingCallsToAWS
        ? await axios.put("https://api.amarovega.net/add-node", emptyNode)
        : await axios.post("http://localhost:8000/add-node", emptyNode);
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
          const result = directingCallsToAWS
            ? await axios.delete("https://api.amarovega.net/delete-node", {
                data: { id: focusedNode.id },
              })
            : await axios.delete("http://localhost:8000/delete-node", {
                data: { id: focusedNode.id },
              });
          setGraph(newGraph);
          updateDataBase();
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
      createdOn: 0,
      lastEditedOn: 0,
      visibility: "",
    };

    // sending the post request to the back-end
    try {
      const result = directingCallsToAWS
        ? await axios.post("https://api.amarovega.net/add-link", newLink)
        : await axios.post("http://localhost:8000/add-link", newLink);
      const newGraph = { ...graph };
      newGraph.links.push(newLink);
      setGraph(newGraph);
      updateDataBase();
    } catch (error) {
      console.error(error);
    }
  };

  //==================================================================================
  // RENDERING
  //==================================================================================

  return (
    <div className="text-primary-lightest">
      <div className="fixed z-0 w-full h-screen bg-primary-darkest"></div>
      <>
        <ForceGraph3D
          // extraRenderers={extraRenderers}
          // nodeThreeObjectExtend={true}
          // nodeThreeObject={(node) => {
          //   const nodeElement = document.createElement("div");
          //   nodeElement.textContent = node.id;
          //   nodeElement.className = "node-label";
          //   return new THREE.CSS2DObject(nodeElement);
          // }}
          showNavInfo={false}
          width={width}
          graphData={graph}
          onNodeClick={handleNodeClick}
          enableNodeDrag={false}
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
        {displayMenu ? (
          <Menu
            setDisplayMenu={setDisplayMenu}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            breakpoint={breakpoint}
          />
        ) : null}
        <Search
          setDisplayMenu={setDisplayMenu}
          panelHidden={panelHidden}
          setPanelHidden={setPanelHidden}
        />
        <BottomButtons
          createNode={createNode}
          setDisplayMenu={setDisplayMenu}
          setHasAccount={setHasAccount}
        />
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
          panelHidden={panelHidden}
          setPanelHidden={setPanelHidden}
        />
      </>
    </div>
  );
}
