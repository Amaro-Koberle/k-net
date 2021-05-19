import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";

// importing components
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import UserMenu from "./UserMenu";
import Settings from "./Settings";
import ResetPassword from "./ResetPassword";

// importing icons
import { MdClose } from "react-icons/md";

export default function Menu({ setDisplayMenu, displayMenu }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  // is the user currently reseting their password?
  const [resettingPassword, setResettingPassword] = useState(false);

  return (
    <>
      {displayMenu ? (
        <>
          <div className="fixed top-0 left-0 z-50 h-screen p-3 bg-opacity-75 shadow-2xl ring-1 ring-gray-darker w-72 bg-gray-darkest text-gray-lightest">
            <div className="flex items-center justify-between w-full space-x-1 text-lg">
              <h1 className="text-2xl font-bold">Logo Placeholder</h1>
              <button onClick={() => setDisplayMenu(false)}>
                <MdClose />
              </button>
            </div>
            {isLoggedIn ? (
              <AuthProvider>
                <UserMenu setDisplayMenu={setDisplayMenu} />
              </AuthProvider>
            ) : resettingPassword ? (
              <AuthProvider>
                <ResetPassword setResettingPassword={setResettingPassword} />
              </AuthProvider>
            ) : hasAccount ? (
              <AuthProvider>
                <LogIn
                  setResettingPassword={setResettingPassword}
                  setHasAccount={setHasAccount}
                  setIsLoggedIn={setIsLoggedIn}
                />
              </AuthProvider>
            ) : (
              <AuthProvider>
                <SignUp setHasAccount={setHasAccount} />
              </AuthProvider>
            )}
          </div>
          {/* modal background overlay */}
          <div
            onClick={() => setDisplayMenu(false)}
            className="fixed top-0 left-0 z-40 w-screen h-screen bg-opacity-75 bg-gray-darkest"
          ></div>
        </>
      ) : null}
    </>
  );
}
