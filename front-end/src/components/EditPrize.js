import React from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";

export default function EditPrize({ setEditingPrize }) {
  console.log("loaded EditPrize component");

  return (
    <>
      {/* header */}
      <div className="flex items-center space-x-2 text-lg jsutify-between">
        <button onClick={() => setEditingPrize(false)}>
          <MdArrowBack />
        </button>
        <h3>Edit Prize</h3>
      </div>
      {/* prize */}
      <label className="label" htmlFor="amount">
        Amount
      </label>
      <input className="w-full input" type="number" id="amount"></input>
    </>
  );
}
