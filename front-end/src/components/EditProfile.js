import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing profile picture placeholder
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdArrowBack } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function EditProfile({ setEditingProfile }) {
  const { currentUser } = useAuth();

  // is the save button currently disabled?
  const [postingDisabled, setPostingDisabled] = useState(true);

  // placeholder
  const Name = "Karl Popper";

  return (
    <div className="m-2">
      {/* header */}
      <div className="flex items-center justify-between text-lg">
        <button onClick={() => setEditingProfile(false)}>
          <MdArrowBack className="text-2xl" />
        </button>
        <h1>Edit Profile</h1>
        <button
          className="font-bold link"
          type="button"
          disabled={postingDisabled}
        >
          Save
        </button>
      </div>
      <div className="container bg-primary-darker">
        {/* profile picture */}
        <div className="flex justify-center">
          <button className="absolute flex items-center justify-center w-6 h-6 transform translate-x-8 translate-y-20 rounded-full ring ring-gray-darker bg-primary-lighter text-primary-darker">
            <MdEdit />
          </button>
          <img
            className="w-20 h-20 m-4 rounded-full"
            src={profilePicture}
            alt={Name}
          />
        </div>
        {/* name and bio */}
        <form className="mt-4 space-y-7">
          <div className="form-field">
            <input
              className="input"
              type="text"
              id="name"
              placeholder=" "
              value={currentUser.displayName}
            />
            <label className="label" htmlFor="name">
              Name
            </label>
          </div>
          <div className="form-field">
            <textarea
              className="input"
              rows="5"
              id="bio"
              placeholder=" "
            ></textarea>
            <label className="label" htmlFor="description">
              Bio
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
