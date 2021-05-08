import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MdClose } from "react-icons/md";

export default function StartSession() {
  const [authenticating, setAuthenticating] = useState(false);
  const startSession = () => {
    setAuthenticating(true);
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      {authenticating ? (
        <div className="fixed top-0 right-0 z-50 p-3 m-3 bg-opacity-75 border shadow-lg bg-gray-dark text-gray-lightest border-gray rounded-xl">
          <div className="flex items-center w-full space-x-1 text-lg">
            <h3>Start Session</h3>

            <button
              className="justify-end"
              onClick={() => setAuthenticating(false)}
            >
              <MdClose></MdClose>
            </button>
          </div>
          <div className="mt-4 text-sm">
            <span>Already have an account? </span>
            <span>Log in here.</span>
          </div>
          {/* sign up form */}
          <form className="w-full" onSubmit={handleSubmit}>
            {currentUser && currentUser.email}
            {error && <span className="text-red">{error}</span>}
            <>
              <label className="label" htmlFor="email">
                email
              </label>
              <div>
                <input
                  className="input"
                  type="email"
                  id="email"
                  ref={emailRef}
                  required
                  placeholder="name.example@emailprovider.com"
                ></input>
              </div>
            </>
            <>
              <label className="label" htmlFor="password">
                Password
              </label>
              <div>
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="12345"
                  ref={passwordRef}
                  required
                ></input>
              </div>
            </>
            <>
              <label className="label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div>
                <input
                  className="input"
                  type="password"
                  id="confirmPassword"
                  placeholder="12345"
                  ref={passwordConfirmRef}
                  required
                ></input>
              </div>
            </>
            <button
              disabled={loading}
              className="w-full mt-2 btn"
              type="button"
            >
              Sign Up
            </button>
          </form>
        </div>
      ) : (
        <div className="absolute top-0 right-0 m-3 text-gray-lightest">
          <button
            className="p-4 border shadow-lg border-gray btn"
            onClick={startSession}
          >
            Start Session
          </button>
        </div>
      )}
    </>
  );
}
