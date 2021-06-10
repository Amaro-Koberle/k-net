import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function EditName() {
  const { updateDisplayName } = useAuth();
  let newName = "";

  useEffect(() => {
    console.log(newName);
  }, [newName]);

  return (
    <form className="container pt-5 space-y-7 bg-gray-darker">
      {/* name */}
      <div className="form-field">
        <input
          onInput={(e) => (newName = e.target.value)}
          required
          className="w-full input"
          type="text"
          id="newName"
          placeholder=" "
        />
        <label className="label" htmlFor="newName">
          New name
        </label>
      </div>
      <button
        onClick={() => updateDisplayName(newName)}
        type="button"
        className="btn-light"
      >
        Save
      </button>
    </form>
  );
}
