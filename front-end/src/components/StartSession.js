import React from "react";

export default function StartSession({ setHasAccount, setDisplayMenu }) {
  const login = () => {
    setHasAccount(true);
    setDisplayMenu(true);
  };
  return (
    <div className="fixed bottom-0 right-0 flex m-4 space-x-3 whitespace-nowrap">
      <button
        onClick={() => login()}
        className="p-2 px-6 rounded-full btn bg-primary-darker"
      >
        Log in
      </button>
      <button
        onClick={() => setDisplayMenu(true)}
        className="p-2 px-6 rounded-full btn-light btn"
      >
        Sign up
      </button>
    </div>
  );
}
