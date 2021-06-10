import React from "react";
import { useAuth } from "../contexts/AuthContext";

// importing profile picture placeholder
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdArrowBack } from "react-icons/md";

export default function ProfileDisplay({
  setEditingProfile,
  setDisplayingProfile,
}) {
  // TODO show the option to edit the profile online if it belongs to the currently logged in person
  const { currentUser } = useAuth();

  // placeholder
  const Name = "Karl Popper";

  return (
    <div className="m-2">
      {/* header */}
      <div className="flex items-center font-serif text-lg">
        <button onClick={() => setDisplayingProfile(false)}>
          <MdArrowBack className="text-2xl" />
        </button>
        <h1>{Name}</h1>
      </div>
      {/* profile picture */}
      <div className="flex justify-center">
        <img
          className="w-20 h-20 m-4 rounded-full"
          src={profilePicture}
          alt={Name}
        />
      </div>
      <span className="flex justify-center text-primary-lighter">
        @karlpopper
      </span>
      {/* bio */}
      <p className="mt-4 font-serif text-sm text-primary-lighter">
        All knowledge is the product of an evolutionary process of trial and
        error. In genetic evolution, knowledge stems from mutation and
        selection, whereas people create knowledge by way of conjectures and
        refutations - one guess at a time.
      </p>
      {/* button row */}
      <div className="mt-4">
        <button className="btn" onClick={() => setEditingProfile(true)}>
          Edit profile
        </button>
      </div>
      {/* authored content tabs */}
      <div className="flex justify-center mt-4">
        <span className="text-sm font-bold text-primary-light">Nodes</span>
      </div>
    </div>
  );
}
