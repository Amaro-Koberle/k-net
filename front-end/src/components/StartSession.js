import React from "react";

export default function StartSession({ setHasAccount, setDisplayMenu }) {
  const login = () => {
    setHasAccount(true);
    setDisplayMenu(true);
  };
  return (
    <div className="fixed bottom-0 right-0 m-4">
      <div className="space-x-1 rounded-full ">
        <button
          onClick={() => login()}
          className="p-4 pl-6 rounded-l-full rounded-r-none hover:bg-primary-light hover:text-primary-darkest focus:outline-none focus:ring ring-secondary-light bg-primary-darker"
        >
          Log in
        </button>
        <button
          onClick={() => setDisplayMenu(true)}
          className="p-4 pr-6 rounded-l-none rounded-r-full hover:bg-secondary-light hover:text-secondary-darker focus:outline-none focus:ring ring-secondary-light text-secondary-light bg-primary-darker"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
