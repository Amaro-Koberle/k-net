import React from "react";

export default function EditPassword({ setEditingPassword }) {
  return (
    <>
      {/* header */}
      <div className="flex items-center space-x-2 text-lg jsutify-between">
        <button onClick={() => setEditingPassword(false)}>
          <MdArrowBack />
        </button>
        <h3>Edit Password</h3>
      </div>
      {/* password */}
      <label className="label" htmlFor="title">
        New password
      </label>
      <input className="w-full input" type="password" id="title"></input>
      {/* confirm password */}
      <label className="label" htmlFor="newPassword">
        Repeat new password
      </label>
      <input
        className="w-full input"
        type="password"
        id="ConfirmNewPassword"
      ></input>
    </>
  );
}
