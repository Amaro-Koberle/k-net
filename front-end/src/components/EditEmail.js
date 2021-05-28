import React from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";

export default function EditEmail() {
  return (
    <form className="container pt-5 bg-gray-darker space-y-7">
      {/* email */}
      <div className="form-field">
        <input
          className="w-full input"
          type="password"
          placeholder=" "
          id="title"
        />
        <label className="label" htmlFor="currentPassword">
          Current password
        </label>
      </div>
      <div className="form-field">
        <input
          className="w-full input"
          type="email"
          placeholder=" "
          id="title"
        />
        <label className="label" htmlFor="newEmail">
          New email
        </label>
      </div>
      <button type="button" className="btn-light">
        Save
      </button>
    </form>
  );
}
