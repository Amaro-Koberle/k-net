import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdWarning } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";

export default function ResetPassword({ setResettingPassword }) {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // on clicking the Reset password button
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox to continue resetting your password");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="container">
        {/* header */}
        <span className="flex justify-center w-full">Reset Password</span>
        {/* log in form */}
        <form onSubmit={handleSubmit}>
          {/* error message */}
          {error && (
            <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-primary-light bg-primary border-primary-light">
              <MdWarning />
              <span>{error}</span>
            </div>
          )}
          {message && (
            <div className="inline-flex items-center w-full p-2 space-x-4 text-sm border rounded-lg text-primary-light bg-primary border-primary-light">
              <MdCheckCircle />
              <span>{message}</span>
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
            />
          </>
          <button
            disabled={loading}
            className="w-full mt-4 btn-light"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
      <button
        className="w-full mt-4 btn"
        type="button"
        onClick={() => setResettingPassword(false)}
      >
        Log in
      </button>
    </>
  );
}
