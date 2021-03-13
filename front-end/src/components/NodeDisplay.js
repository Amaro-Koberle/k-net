import React from "react";
import { MdEdit } from "react-icons/md";

export default function NodeDisplay({ currNode, editing, setEditing }) {
  if (editing === true) return null;
  if (currNode.id === "") {
    console.log("No node is currently selected");
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 text-lg">
        <h3>{currNode.title}</h3>
        <button className="edit-button" onClick={() => setEditing(true)}>
          <MdEdit></MdEdit>
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm">{currNode.description}</p>
        <div>
          <div className="mt-4">
            <h5>Incoming Links</h5>
            <ul>
              {currNode.inLinks.map((link) => (
                <li>{link}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h5>Outgoing Links</h5>
            <ul>
              {currNode.outLinks.map((link) => (
                <li>{link}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
