import React, { useState } from "react";

// importing components
import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";

// importing icons
import { MdNavigateNext } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";

export default function Settings({ setEditingSettings }) {
  // is the user currently editing their password?
  const [editingPassword, setEditingPassword] = useState(false);
  // is the user currently editing their email?
  const [editingEmail, setEditingEmail] = useState(false);

  return (
    <>
      {editingEmail ? (
        <EditEmail setEditingEmail={setEditingEmail} />
      ) : editingPassword ? (
        <EditPassword setEditingPassword={setEditingPassword} />
      ) : (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-opacity-75 bg-gray-darkest border-gray-darker">
          {/* header */}
          <div className="flex items-center space-x-2 text-lg jsutify-between">
            <button onClick={() => setEditingSettings(false)}>
              <MdArrowBack />
            </button>
            <h3>Settings</h3>
          </div>
          {/* account */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm">
              <MdPerson className="text-gray-light" />
              <span className="text-gray-light">Account</span>
              <MdArrowDropUp className="text-lg" />
            </div>
            <div
              onClick={() => setEditingEmail(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Email</span>
              <span className="text-gray-light">email@placeholder.com</span>
              <MdNavigateNext />
            </div>
            <div
              onClick={() => setEditingPassword(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Password</span>
              <span className="text-gray-light">••••••••</span>
              <MdNavigateNext />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Delete account</span>
              <span className="text-gray-light"></span>
              <MdNavigateNext />
            </div>
          </div>
          {/* profile */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm">
              <MdAccountCircle className="text-gray-light" />
              <span className="text-gray-light">Profile</span>
              <MdArrowDropUp className="text-lg" />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Name</span>
              <span className="text-gray-light">@username</span>
              <MdNavigateNext />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Profile picture</span>
              <span className="text-gray-light"></span>
              <MdNavigateNext />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Home node</span>
              <span className="text-gray-light">Home Node Title</span>
              <MdNavigateNext />
            </div>
          </div>
          {/* payment */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm">
              <MdAttachMoney className="text-gray-light" />
              <span className="text-gray-light">Payment</span>
              <MdArrowDropUp className="text-lg" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
