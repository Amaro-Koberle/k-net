import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

// importing icons
import { MdControlPoint, MdWarning } from "react-icons/md";

export default function SignUp({ setHasAccount }) {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // on clicking the Sign Up button
  async function handleSubmit(e) {
    e.preventDefault();
    const { displayName, email, password } = e.target;

    setError("");
    setLoading(true);
    signup(email.value, password.value, displayName.value)
      .then((user) => {
        // TODO redirect the user to sign up confirmation page
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }
  console.log(error);
  return (
    <>
      <div className="container bg-gray-darker">
        {/* header */}
        <span className="flex justify-center w-full text-lg">Sign Up</span>
        {/* sign up form */}
        <form className="space-y-7" onSubmit={handleSubmit}>
          {/* error display */}
          {error && (
            <div className="inline-flex items-center w-full p-2 px-4 mt-4 space-x-4 text-sm border rounded-lg text-secondary bg-secondary-lighter border-secondary">
              <MdWarning className="text-4xl" />
              <span>{error}</span>
            </div>
          )}
          {/* email form field */}
          <div className="form-field">
            <input
              className="input"
              type="email"
              id="email"
              placeholder=" "
              name="email"
              required
            />
            <label className="label" htmlFor="email">
              Email
            </label>
          </div>
          {/* password form field */}
          <div className="form-field">
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder=" "
              required
            />
            <label className="label" htmlFor="password">
              Password
            </label>
          </div>
          {/* display name form field */}
          <div className="form-field">
            <input
              className="input"
              type="text"
              id="displayName"
              name="displayName"
              placeholder=" "
              required
            />
            <label className="label" htmlFor="confirmPassword">
              Display name
            </label>
          </div>
          {/* submit sign up form button */}
          <button
            disabled={loading}
            className="w-full mt-4 btn-light"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
      {/* log in */}
      <div className="flex justify-center w-full mt-4">
        <button
          type="button"
          className="link"
          onClick={() => setHasAccount(true)}
        >
          Log in
        </button>
      </div>
    </>
  );
}
