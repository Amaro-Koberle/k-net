import React, { useState, useEffect } from "react";
import { MdExpandMore } from "react-icons/md";

export default function NodeWidget({ NodeID, graph }) {
  const [node, setNode] = useState({ title: "Node Title" });

  useEffect(() => {
    setNode(graph.nodes.find((node) => NodeID === node.id));
  }, []);

  return (
    <div className="flex items-center justify-between px-2 py-1 mt-2 text-sm rounded-lg text-gray-darkest bg-gray-lighter">
      <span>{node.title}</span>
      <MdExpandMore />
    </div>
  );
}
