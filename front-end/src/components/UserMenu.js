import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing components
import Settings from "./Settings";

// importing profile picture
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdSettings } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdWarning } from "react-icons/md";

export default function UserMenu({ setDisplayMenu }) {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [editingSettings, setEditingSettings] = useState(false);

  // this is just a placeholder
  const userName = "Karl Popper";

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
      {editingSettings ? (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-opacity-75 bg-gray-darkest border-gray-darker">
          <Settings setEditingSettings={setEditingSettings} />
        </div>
      ) : (
        <>
          <div className="container grid items-center grid-cols-4 grid-rows-2 gap-2">
            <img
              className="row-span-2 border rounded-full w-14 h-14 border-gray-darker"
              src={profilePicture}
              alt={userName}
            />
            <span className="col-span-3">{userName}</span>
            <span
              className="col-span-3 text-sm underline text-gray-light"
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
          <button
            type="button"
            onClick={() => handleLogout()}
            className="w-full mt-4 btn"
          >
            Log Out
          </button>
        </>
      )}
    </>
  );
}
