import React from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";

export default function EditEmail({ setEditingEmail }) {
  return (
    <>
      {/* header */}
      <div className="flex items-center space-x-2 text-lg jsutify-between">
        <button onClick={() => setEditingEmail(false)}>
          <MdArrowBack />
        </button>
        <h3>Edit Email</h3>
      </div>
      {/* email */}
      <label className="label" htmlFor="title">
        New email
      </label>
      <input className="w-full input" type="password" id="title"></input>
    </>
  );
}
