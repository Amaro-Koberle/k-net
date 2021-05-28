import React from "react";

//importing icons
import { MdCancel } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function DiscardNodeChangesPopUp({
  setEditingNode,
  setDisplayDiscardNodeChangesPopUp,
}) {
  return (
    <div className="fixed left-0 col-start-2 col-end-3 sm:absolute sm:grid grid-rows3">
      <div className="bottom-0 z-50 w-screen grid-cols-3 p-3 sm:rounded-2xl rounded-t-2xl ring-1 ring-primary-darker bg-primary-darkest">
        <div
          onClick={() => setEditingNode(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdCancel className="text-xl" />
          <span>Discard node changes</span>
        </div>
        <div
          onClick={() => setDisplayDiscardNodeChangesPopUp(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdCheckCircle className="text-xl" />
          <span>Continue editing</span>
        </div>
      </div>
      {/* modal background overlay */}
      <div
        onClick={() => setDisplayDiscardNodeChangesPopUp(false)}
        className="fixed top-0 z-40 w-screen h-screen bg-opacity-75 bg-primary-darkest"
      ></div>
    </div>
  );
}
