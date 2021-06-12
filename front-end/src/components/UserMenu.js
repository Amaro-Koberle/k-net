import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing components
import Settings from "./Settings";

// importing profile picture placeholder
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdSettings } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdWarning } from "react-icons/md";

export default function UserMenu({ setDisplayingProfile, setDisplayMenu }) {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [editingSettings, setEditingSettings] = useState(false);
  if (!currentUser) return null;

  const Name = currentUser.displayName;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      // TODO log user out and redirect them
    } catch {
      setError("Failed to log out");
    }
  }

  const goToProfile = () => {
    setDisplayingProfile(true);
    setDisplayMenu(false);
  };

  return (
    <>
      {editingSettings ? (
        <Settings setEditingSettings={setEditingSettings} />
      ) : (
        <>
          {/* user */}
          <div className="container grid items-center grid-cols-4 grid-rows-2 gap-2">
            <img
              className="row-span-2 border rounded-full w-14 h-14 border-primary-darker"
              src={profilePicture}
              alt={Name}
            />
            <span className="col-span-3 text-lg">{Name}</span>
            <div className="col-span-3">
              <button
                type="button"
                className="link"
                onClick={() => goToProfile()}
              >
                Go to your profile
              </button>
            </div>
          </div>
          <>
            <button
              className="py-2 btn-menu"
              type="button"
              onClick={() => setEditingSettings(true)}
            >
              <MdSettings className="mr-4 text-lg" />
              Settings
            </button>
            <button type="button" className="py-2 btn-menu">
              <MdAttachMoney className="mr-4 text-lg" />
              Credits
            </button>
          </>
          {/* error message */}
          {error && (
            <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-primary-light bg-primary border-primary-light">
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
