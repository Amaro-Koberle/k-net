import React from "react";

import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";

export default function Search() {
  return (
    <div className="inline-flex items-center w-full p-2 space-x-2 rounded shadow-lg bg-gray">
      <button type="button">
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
