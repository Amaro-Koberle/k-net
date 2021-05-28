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
      <div className="container bg-gray-darker">
        {/* header */}
        <span className="flex justify-center w-full text-lg">Sign Up</span>
        {/* sign up form */}
        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* error message */}
          {error && (
            <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-primary-light bg-primary border-primary-light">
              <MdWarning />
              <span>{error}</span>
            </div>
          )}
          <div className="form-field">
            <input
              className="input"
              type="email"
              id="email"
              placeholder=" "
              ref={emailRef}
              required
            />
            <label className="label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="form-field">
            <input
              className="input"
              type="password"
              id="password"
              placeholder=" "
              ref={passwordRef}
              required
            />
            <label className="label" htmlFor="password">
              Password
            </label>
          </div>
          <div className="form-field">
            <input
              className="input"
              type="password"
              id="confirmPassword"
              placeholder=" "
              ref={passwordConfirmRef}
              required
            />
            <label className="label" htmlFor="confirmPassword">
              Confirm password
            </label>
          </div>
          <button
            disabled={loading}
            className="w-full mt-4 btn-light"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex justify-center w-full mt-4">
        <button
          type="button"
          className="link"
          onClick={() => setHasAccount(true)}
        >
          Log In
        </button>
      </div>
    </>
  );
}
