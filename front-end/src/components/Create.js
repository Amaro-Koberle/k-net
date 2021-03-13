import React from "react";
import { MdAdd } from "react-icons/md";

export default function Create({ newNode }) {
  return (
    <div className="absolute bottom-0 right-0 z-40 m-3">
      <button
        className="p-3 text-3xl bg-gray-800 rounded-full btn"
        onClick={newNode}
      >
        <MdAdd></MdAdd>
      </button>
    </div>
  );
}
