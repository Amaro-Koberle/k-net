import React from "react";

// importing icons
import { MdAdd } from "react-icons/md";

export default function CreateNode({ createNode }) {
  return (
    <div className="absolute bottom-0 right-0 z-30 m-3 text-gray-lightest">
      <button
        className="p-3 text-3xl border rounded-full shadow-lg bg-gray-darkerest btn"
        onClick={createNode}
      >
        <MdAdd></MdAdd>
      </button>
    </div>
  );
}
