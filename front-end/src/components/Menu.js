import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";

// importing components
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import UserMenu from "./UserMenu";
import ResetPassword from "./ResetPassword";

// importing icons
import { MdClose } from "react-icons/md";

export default function Menu({
  setDisplayMenu,
  isLoggedIn,
  setIsLoggedIn,
  setHasAccount,
  hasAccount,
}) {
  // is the user currently reseting their password?
  const [resettingPassword, setResettingPassword] = useState(false);

  const exit = () => {
    setHasAccount(false);
    setDisplayMenu(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 h-screen p-3 shadow-2xl w-80 ring-1 ring-primary-darker bg-primary-darkest text-primary-lightest">
        {/* header */}
        <div className="flex items-center justify-between w-full px-1 mt-2 space-x-1 text-lg">
          <h1 className="font-serif text-3xl font-bold text-secondary-light">
            K-net
          </h1>
          <button onClick={() => exit()}>
            <MdClose className="text-2xl text-primary" />
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
        <div className="absolute inset-x-0 flex justify-center text-sm bottom-4 text-primary">
          <span>Fuck copyright, copy all you want</span>
        </div>
      </div>
      {/* modal background overlay */}
      <div
        onClick={() => exit()}
        className="fixed top-0 left-0 z-40 w-screen h-screen bg-opacity-75 bg-primary-darkest"
      ></div>
    </>
  );
}
