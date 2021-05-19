import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdWarning } from "react-icons/md";

export default function LogIn({
  setHasAccount,
  setIsLoggedIn,
  setResettingPassword,
}) {
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
      <div className="container">
        {/* header */}
        <span className="flex justify-center w-full">Log In</span>
        {/* log in form */}
        <form onSubmit={handleSubmit}>
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
            className="flex justify-end w-full mt-1 text-sm lex text-gray-lighter"
            onClick={() => setResettingPassword(true)}
            type="button"
          >
            Forgot password?
          </button>
          <button
            disabled={loading}
            className="w-full mt-4 btn-primary"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
      <button
        className="flex justify-center w-full mt-4 text-sm text-gray-lighter"
        type="button"
        onClick={() => setHasAccount(false)}
      >
        Create account
      </button>
    </>
  );
}
