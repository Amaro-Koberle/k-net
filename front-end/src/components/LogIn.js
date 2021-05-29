import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdWarning } from "react-icons/md";

export default function LogIn({
  setHasAccount,
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
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container bg-gray-darker">
        {/* header */}
        <span className="flex justify-center w-full text-lg">Log In</span>
        {/* log in form */}
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
          <div className="flex items-center">
            <div className="flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                id="rememberme"
                className="border-none rounded-sm hover:bg-gray-lightest bg-gray-lighter text-secondary-light"
              />
              <span
                className="text-sm text-primary-light active:text-secondary-light whitespace-nowrap"
                htmlFor="rememberme"
              >
                Remember me
              </span>
            </div>
            <div className="flex justify-end w-full">
              <button
                className="text-sm link"
                onClick={() => setResettingPassword(true)}
                type="button"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full mt-4 btn-light"
            type="submit"
          >
            Log in
          </button>
        </form>
      </div>
      <div className="flex justify-center w-full mt-4">
        <button
          className="link"
          type="button"
          onClick={() => setHasAccount(false)}
        >
          Create account
        </button>
      </div>
    </>
  );
}
