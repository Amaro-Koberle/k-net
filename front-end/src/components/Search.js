import React, { useState } from "react";

// importing components
import Menu from "./Menu";

// importing icons
import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";

export default function Search() {
  // is the main menu currently being displayed?
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <>
      {displayMenu ? (
        <Menu setDisplayMenu={setDisplayMenu} displayMenu={displayMenu} />
      ) : (
        <div className="fixed top-0 left-0 w-screen p-3">
          <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-gray-darker">
            <button type="button" onClick={() => setDisplayMenu(true)}>
              <MdMenu className="text-lg" />
            </button>
            <input
              className="w-full input"
              type="text"
              id="Search"
              placeholder="Search"
            ></input>
            <button type="button">
              <MdSearch className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
