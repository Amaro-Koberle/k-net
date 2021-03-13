import React from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function StartSession() {
  const [authenticating, setAuthenticating] = useState(false);
  const startSession = () => {
    setAuthenticating(true);
  };
  if (authenticating === true)
    return (
      <div className="fixed top-0 right-0 z-50 p-3 m-3 bg-gray-800 rounded-xl">
        <div className="flex items-center space-x-1 text-lg">
          <div>
            <h3>Start Session</h3>
          </div>
          <div className="">
            <button className="" onClick={() => setAuthenticating(false)}>
              <MdClose></MdClose>
            </button>
          </div>
        </div>
        <form>
          <div className="m-1">
            <label className="label" for="email">
              email
            </label>
            <div>
              <input
                className="input"
                type="email"
                id="email"
                placeholder="name.example@emailprovider.com"
              ></input>
            </div>
          </div>
          <div className="m-1">
            <label className="label" for="password">
              Password
            </label>
            <div>
              <input
                className="input"
                type="password"
                id="password"
                placeholder="12345"
              ></input>
            </div>
          </div>
          <div className="m-1">
            <button className="w-full btn" type="button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  else {
    return (
      <div className="absolute top-0 right-0 m-3">
        <button className="bg-gray-800 btn" onClick={startSession}>
          Start Session
        </button>
      </div>
    );
  }
}
