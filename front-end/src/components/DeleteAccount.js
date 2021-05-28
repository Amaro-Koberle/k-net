import React from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";
import { MdWarning } from "react-icons/md";

export default function DeleteAccount({ setDeletingAccount }) {
  return (
    <>
      {/* header */}
      <div className="flex items-center space-x-2 text-lg jsutify-between">
        <button onClick={() => setDeletingAccount(false)}>
          <MdArrowBack />
        </button>
        <h1>Delete account</h1>
      </div>
      {/* delete Account */}
      <div className="container">
        <div className="flex items-center space-x-2">
          <MdWarning />
          <span>Danger Zone</span>
        </div>
        <p className="mt-2 text-sm">Warning text placeholder.</p>
        <button
          className="w-full mt-2 btn bg-primary-light text-primary-darkest"
          type="button"
          id="deleteAccount"
        >
          Delete account
        </button>
      </div>
    </>
  );
}
