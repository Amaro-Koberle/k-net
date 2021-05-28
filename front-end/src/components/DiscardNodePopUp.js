import React from "react";

//importing icons
import { MdDelete } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function DiscardNodePopUp({
  deleteNode,
  setDisplayDiscardNodePopUp,
}) {
  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-screen p-3 bg-op rounded-t-2xl ring-1 ring-primary-darker bg-primary-darkest">
        <div className="flex flex-wrap mt-4">
          <span>Want to finish your node later?</span>
          <span className="text-sm text-primary">
            Save it as a draft or continue editing it now.
          </span>
        </div>
        <div
          onClick={() => deleteNode()}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdDelete className="text-xl" />
          <span>Discard node</span>
        </div>
        <div
          onClick={() => setDisplayDiscardNodePopUp(false)}
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-primary"
        >
          <MdCheckCircle className="text-xl" />
          <span>Continue editing</span>
        </div>
      </div>
      {/* modal background overlay */}
      <div
        onClick={() => setDisplayDiscardNodePopUp(false)}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-opacity-75 bg-primary-darkest"
      ></div>
    </div>
  );
}
