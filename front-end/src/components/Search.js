import React from "react";
import { MdSearch } from "react-icons/md";

export default function Search() {
  return (
    <div>
      <div className="inline-flex items-center w-full p-2 space-x-2 bg-gray-700 rounded">
        <input
          className="w-full input"
          type="text"
          id="Search"
          placeholder="Search"
        ></input>
        <div className="">
          <button className="" type="button">
            <MdSearch className="text-lg"></MdSearch>
          </button>
        </div>
      </div>
    </div>
  );
}
