import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing profile picture placeholder
import profilePicture from "../KarlPopper.jpg";

// importing icons
import { MdArrowBack } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function EditProfile({ setEditingProfile }) {
  const { currentUser, updateDisplayAndBio } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser ? currentUser.displayName : '');
  const [bio, setBio] = useState(currentUser ? currentUser.bio : '');
  console.log(currentUser);
  
  const isValid = displayName.length > 2 && bio.length > 2;
  
  // is the save button currently disabled?
  const [status, setStatus] = useState({})
  
  if(!currentUser) return null;
  // placeholder
  const Name = "Karl Popper";
  const onSubmit = e => {
    setStatus({ isLoading: true });
    updateDisplayAndBio(displayName, bio)
      .then(currentUser => {
        alert('User has been updated!')
        setStatus({})
      })
      .catch(err => setStatus({ error: err.message }))

  }
  const { isLoading, error } = status;
  return (
    <div className="m-2">
      {/* header */}
      <div className="flex items-center justify-between text-lg">
        <button onClick={() => setEditingProfile(false)}>
          <MdArrowBack className="text-2xl" />
        </button>
        <h1>Edit Profile</h1>
        {isLoading ? (
          <span className='loader'></span>
        ) : <button
          className="font-bold link"
          type="button"
          onClick={onSubmit}
          disabled={!isValid}
        >
          Save
        </button>}
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
        <form className="mt-4 space-y-7" onSubmit={onSubmit}>
          <div className="form-field">
            <input
              className="input"
              type="text"
              id="name"
              placeholder=" "
              value={displayName}
              name='displayName'
              onChange={e => setDisplayName(e.target.value)}
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
              name='bio'
              placeholder=" "
              value={bio}
              onChange={e => setBio(e.target.value)}
            ></textarea>
            <label className="label" htmlFor="description">
              Bio
            </label>
          </div>
          {error && <p className='text-danger' style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
