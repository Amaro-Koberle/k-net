import React from "react";

//importing icons
import { MdDelete } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function DeleteNodePopUp({
  deletingNode,
  setDisplayDeleteNodePopUp,
}) {
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-screen p-3 rounded-t-2xl ring-1 ring-primary-darker bg-primary-darkest">
        <div
          onClick={() => deletingNode()}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdDelete className="text-xl" />
          <span>Delete node</span>
        </div>
        <div
          onClick={() => setDisplayDeleteNodePopUp(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdCheckCircle className="text-xl" />
          <span>Continue editing</span>
        </div>
      </div>
      {/* modal background overlay */}
      <div
        onClick={() => setDisplayDeleteNodePopUp(false)}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-opacity-75 bg-primary-darkest"
      ></div>
    </div>
  );
}
