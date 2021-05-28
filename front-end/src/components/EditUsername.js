import React from "react";

export default function EditUsername() {
  return (
    <form className="container pt-5 space-y-7 bg-gray-darker">
      {/* username */}
      <div className="form-field">
        <input
          className="w-full input"
          type="text"
          id="newUsername"
          placeholder=" "
        />
        <label className="label" htmlFor="newUsername">
          New username
        </label>
      </div>
      <button type="button" className="btn-light">
        Save
      </button>
    </form>
  );
}
