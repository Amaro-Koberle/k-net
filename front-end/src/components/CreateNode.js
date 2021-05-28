import React from "react";

// importing icons
import { MdAdd } from "react-icons/md";

export default function CreateNode({ createNode }) {
  return (
    <div className="absolute bottom-0 right-0 z-30 m-3">
      <button
        className="p-3 text-3xl rounded-full bg-primary-darker btn"
        onClick={() => createNode()}
      >
        <MdAdd></MdAdd>
      </button>
    </div>
  );
}
