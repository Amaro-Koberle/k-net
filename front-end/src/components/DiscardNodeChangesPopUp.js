import React from "react";

//importing icons
import { MdCancel } from "react-icons/md";
import { MdCheck } from "react-icons/md";

export default function DiscardNodeChangesPopUp({
  setEditingNode,
  setDisplayDiscardNodeChangesPopUp,
}) {
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-screen p-3 bg-opacity-75 rounded-t-2xl ring-1 ring-gray-darker bg-gray-darkest">
        <div
          onClick={() => setEditingNode(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-gray"
        >
          <MdCancel />
          <span>Discard node changes</span>
        </div>
        <div
          onClick={() => setDisplayDiscardNodeChangesPopUp(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-gray"
        >
          <MdCheck />
          <span>Continue editing</span>
        </div>
      </div>
      {/* modal background overlay */}
      <div
        onClick={() => setDisplayDiscardNodeChangesPopUp(false)}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-opacity-75 bg-gray-darkest"
      ></div>
    </div>
  );
}
