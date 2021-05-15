import React from "react";

import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";

export default function Search({ setDisplayMenu }) {
  return (
    <div className="inline-flex items-center w-full p-2 px-5 space-x-2 rounded-full shadow-lg bg-gray-darker">
      <button type="button" onClick={() => setDisplayMenu(true)}>
        <MdMenu className="text-lg"></MdMenu>
      </button>
      <input
        className="w-full input"
        type="text"
        id="Search"
        placeholder="Search"
      ></input>
      <button type="button">
        <MdSearch className="text-lg"></MdSearch>
      </button>
    </div>
  );
}
