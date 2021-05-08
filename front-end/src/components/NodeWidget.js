import React from "react";
import { MdExpandMore } from "react-icons/md";

export default function NodeWidget({ NodeID, graph }) {
  const node = graph.nodes.find((node) => NodeID === node.id);
  //console.log(node.title);
  return (
    <div className="flex px-2 py-1 mt-2 space-x-4 text-sm rounded-lg text-gray-dark bg-gray-lightest">
      <span>Node Title</span>
      <MdExpandMore />
    </div>
  );
}
