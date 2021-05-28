import React from "react";

export default function EditPassword() {
  return (
    <form className="container pt-5 bg-gray-darker space-y-7">
      {/* new password */}
      <div className="form-field">
        <input
          className="w-full input"
          type="password"
          id="title"
          placeholder=" "
        />
        <label className="label" htmlFor="title">
          New password
        </label>
      </div>
      {/* confirm password */}
      <div className="form-field">
        <input
          className="w-full input"
          type="password"
          id="ConfirmNewPassword"
          placeholder=" "
        />
        <label className="label" htmlFor="newPassword">
          Repeat new password
        </label>
      </div>
      <button type="button" className="btn-light">
        Save
      </button>
    </form>
  );
}
