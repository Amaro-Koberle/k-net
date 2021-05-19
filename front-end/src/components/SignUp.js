import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdWarning } from "react-icons/md";

export default function SignUp({ setHasAccount }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // on clicking the Sign Up button
  async function handleSubmit(e) {
    e.preventDefault();

    // check if the values entered in the two password fields are identical and throw an error if not
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    // attempt sign up
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      // TODO sign up user and redirect them
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        {/* header */}
        <span className="flex justify-center w-full">Sign Up</span>
        {/* sign up form */}
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
          <>
            <label className="label" htmlFor="confirmPassword">
              Confirm password
            </label>
            <div>
              <input
                className="w-full input"
                type="password"
                id="confirmPassword"
                ref={passwordConfirmRef}
                required
              ></input>
            </div>
          </>
          <button
            disabled={loading}
            className="w-full mt-4 btn-primary"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <button
        type="button"
        className="flex justify-center w-full mt-4 text-sm text-gray-lighter"
        onClick={() => setHasAccount(true)}
      >
        Log In
      </button>
    </>
  );
}
