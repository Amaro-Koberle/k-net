import React from "react";

// importing icons
import { MdEdit } from "react-icons/md";

// this is just a placeholder
const userName = "Karl Popper";

export default function ProfileDisplay({ setEditingProfile }) {
  return (
    <div className="m-2">
      {/* header */}
      <div className="flex items-center justify-between font-serif text-lg">
        <h1>{userName}</h1>
        <button className="edit-button" onClick={() => setEditingProfile(true)}>
          <MdEdit className="text-xl" />
        </button>
      </div>
      {/* profile picture */}
      <img
        className="w-20 h-20 border rounded-full border-secondary-light"
        src={profilePicture}
        alt={userName}
      />
    </div>
  );
}
