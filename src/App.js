import React, { useState } from 'react';
import "./App.css";
import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';

function App() {
  const [graph, setGraph] = useState(genRandomTree())
  const [numNodes, setNumNodes] = useState(300)

  function genRandomTree(N = 300, reverse = false) {
    return {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          [reverse ? 'target' : 'source']: id,
          [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
        }))
    };
  }


  const randomiseGraph = () => {
    setGraph(genRandomTree(numNodes))
  }

  return (
    <>
      <div className="button-container">
        <button className="add-node" onClick={() => randomiseGraph()}>
          RANDOMISE GRAPH
        </button>
        <input type="range" value={numNodes} min={1} max={1000} onInput={(e) => setNumNodes(parseInt(e.target.value))} />
        <span style={{ color: "red" }}>{numNodes}</span>
      </div>
      <ForceGraph3D graphData={graph} />
    </>
  );
}

export default App;
