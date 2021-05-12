import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdAccountCircle } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdWarning } from "react-icons/md";

export default function UserMenu({ setEditingSettings }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      // TODO log user out and redirect them
    } catch {
      setError("Failed to log out");
    }
  }

  const goToHomeNode = () => {};

  return (
    <>
      <div className="grid items-center grid-cols-4 grid-rows-2 gap-2 mt-4">
        <MdAccountCircle className="row-span-2 text-6xl text-gray-light" />
        <span className="col-span-3 text-lg">User Name</span>
        <span
          className="col-span-3 underline text-gray-light"
          onClick={() => goToHomeNode()}
        >
          Go to your home node
        </span>
      </div>
      <>
        <div
          className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-gray"
          onClick={() => setEditingSettings(true)}
        >
          <MdSettings className="text-lg" />
          <span>Settings</span>
        </div>
        <div className="flex items-center p-2 mt-2 space-x-4 rounded-md hover:bg-gray">
          <MdAttachMoney className="text-lg" />
          <span>Credits</span>
        </div>
      </>
      {/* error message */}
      {error && (
        <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-gray-light bg-gray border-gray-light">
          <MdWarning />
          <span>{error}</span>
        </div>
      )}
      <button onClick={() => handleLogout()} className="w-full mt-4 btn">
        Log Out
      </button>
    </>
  );
}
