import React from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";

export default function EditUsername({ setEditingUsername }) {
  return (
    <>
      {/* header */}
      <div className="flex items-center space-x-2 text-lg jsutify-between">
        <button onClick={() => setEditingUsername(false)}>
          <MdArrowBack />
        </button>
        <h3>Edit Username</h3>
      </div>
      {/* username */}
      <label className="label" htmlFor="username">
        New username
      </label>
      <input className="w-full input" type="text" id="username"></input>
    </>
  );
}
