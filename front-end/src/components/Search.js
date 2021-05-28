import React from "react";

// importing icons
import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";

export default function Search({ setDisplayMenu, panelHidden }) {
  return (
    <>
      {panelHidden ? (
        <div className="fixed top-0 z-20 w-screen p-3 -left-96 sm:w-96">
          <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-primary-darker">
            <button type="button" onClick={() => setDisplayMenu(true)}>
              <MdMenu className="text-lg" />
            </button>
            <input
              className="w-full input"
              type="text"
              id="Search"
              placeholder="Search"
            />
            <button type="button">
              <MdSearch className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0 z-20 w-screen p-3 sm:w-96">
          <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-primary-darker">
            <button type="button" onClick={() => setDisplayMenu(true)}>
              <MdMenu className="text-lg" />
            </button>
            <input
              className="w-full input"
              type="text"
              id="Search"
              placeholder="Search"
            />
            <button type="button">
              <MdSearch className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
