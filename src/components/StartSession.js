import React from "react";
import { useState } from "react";

export default function StartSession() {
  const [authenticating, setAuthenticating] = useState(false);
  const startSession = () => {
    setAuthenticating(true);
  };
  if (authenticating === true)
    return (
      <div>
        <form>
          <label for="email">email</label>
          <input
            type="email"
            id="email"
            placeholder="name.example@emailprovider.com"
          ></input>
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="12345"></input>
          <button type="button">Sign Up</button>
        </form>
      </div>
    );
  else {
    return (
      <div className="start-session-container">
        <button className="log-in" onClick={startSession}>
          Start Session
        </button>
      </div>
    );
  }
}
