import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

//importing profile picture
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdAccountCircle } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdWarning } from "react-icons/md";

export default function UserMenu({ setEditingSettings, setDisplayMenu }) {
  const [error, setError] = useState("");
  // TODO the line below currently breaks things on loading this component, don't know why
  //const { currentUser, logout } = useAuth();

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

  const handleSettingsClick = () => {
    setEditingSettings(true);
    setDisplayMenu(false);
  };

  return (
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
          onClick={() => handleSettingsClick()}
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
