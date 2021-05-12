import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdWarning } from "react-icons/md";

export default function LogIn({ setHasAccount, setIsLoggedIn }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // on clicking the Log In button
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // TODO log in user and redirect them
      setIsLoggedIn(true);
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      {/* log in form */}
      <form
        className="w-full p-2 mt-4 border rounded-lg shadow-lg border-gray"
        onSubmit={handleSubmit}
      >
        {/* error message */}
        {error && (
          <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-gray-light bg-gray border-gray-light">
            <MdWarning />
            <span>{error}</span>
          </div>
        )}
        <>
          <label className="label" htmlFor="email">
            email
          </label>

          <input
            className="w-full input"
            type="email"
            id="email"
            ref={emailRef}
            required
          ></input>
        </>
        <>
          <label className="label" htmlFor="password">
            Password
          </label>

          <input
            className="w-full input"
            type="password"
            id="password"
            ref={passwordRef}
            required
          ></input>
        </>
        <button
          disabled={loading}
          className="w-full mt-4 border-none text-gray-dark bg-gray-light btn"
          type="submit"
        >
          Log In
        </button>
      </form>

      <button
        className="w-full mt-4 btn"
        onClick={() => setForgotPassword(true)}
        type="button"
      >
        Forgot Password?
      </button>

      <span className="flex justify-center w-full mt-4 text-sm text-gray-light">
        Don't have an account?{" "}
      </span>

      <button
        className="w-full mt-4 btn"
        type="button"
        onClick={() => setHasAccount(false)}
      >
        Sign Up
      </button>
    </>
  );
}
