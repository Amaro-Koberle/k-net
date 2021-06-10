import React, { useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";

// importing components
import EditPassword from "./EditPassword";
import EditEmail from "./EditEmail";
import DeleteAccount from "./DeleteAccount";
import EditName from "./EditName";

// importing icons
import { MdNavigateNext } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";

export default function Settings({ setEditingSettings, breakpoint }) {
  // is the user currently editing their password?
  const [editingPassword, setEditingPassword] = useState(false);
  // is the user currently editing their email?
  const [editingEmail, setEditingEmail] = useState(false);
  // is the user currently deleting their account?
  const [deletingAccount, setDeletingAccount] = useState(false);
  // is the user currently editing their username?
  const [editingName, setEditingName] = useState(false);

  const changeToEditingEmail = () => {
    setEditingPassword(false);
    setDeletingAccount(false);
    setEditingName(false);
    setEditingEmail(true);
  };

  const changeToEditingName = () => {
    setEditingPassword(false);
    setDeletingAccount(false);
    setEditingEmail(false);
    setEditingName(true);
  };

  const changeToEditingPassword = () => {
    setDeletingAccount(false);
    setEditingName(false);
    setEditingEmail(false);
    setEditingPassword(true);
  };

  const changeToDeletingAccount = () => {
    setEditingPassword(false);
    setEditingName(false);
    setEditingEmail(false);
    setDeletingAccount(true);
  };

  return breakpoint === 0 ? (
    // mobile breakpoint
    <>
      {editingEmail ? (
        <>
          {/* header */}
          <div className="flex items-center space-x-2 text-lg jsutify-between">
            <button onClick={() => setEditingEmail(false)}>
              <MdArrowBack />
            </button>
            <h1>Edit Email</h1>
          </div>
          <EditEmail />
        </>
      ) : editingPassword ? (
        <>
          {/* header */}
          <div className="flex items-center space-x-2 text-lg jsutify-between">
            <button onClick={() => setEditingPassword(false)}>
              <MdArrowBack />
            </button>
            <h1>Edit Password</h1>
          </div>
          <EditPassword />
        </>
      ) : deletingAccount ? (
        <>
          <DeleteAccount />
        </>
      ) : editingName ? (
        <>
          {/* header */}
          <div className="flex items-center space-x-2 text-lg jsutify-between">
            <button onClick={() => setEditingName(false)}>
              <MdArrowBack />
            </button>
            <h1>Edit Name</h1>
          </div>
          <EditName setEditingName={setEditingName} />
        </>
      ) : (
        <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-primary-darkest border-primary-darker">
          {/* header */}
          <div className="flex items-center space-x-2 text-lg jsutify-between">
            <button onClick={() => setEditingSettings(false)}>
              <MdArrowBack className="text-2xl" />
            </button>
            <h1>Settings</h1>
          </div>
          {/* account */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm text-primary-light">
              <MdPerson />
              <span>ACCOUNT</span>
            </div>
            <div
              onClick={() => setEditingEmail(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Email</span>
              <span className="text-primary-light">email@placeholder.com</span>
              <MdNavigateNext />
            </div>
            <div
              onClick={() => setEditingPassword(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Password</span>
              <span className="text-primary-light">••••••••</span>
              <MdNavigateNext />
            </div>
            <div
              onClick={() => setDeletingAccount(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Delete account</span>
              <span className="text-primary-light"></span>
              <MdNavigateNext />
            </div>
          </div>
          {/* profile */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm text-primary-light">
              <MdAccountCircle />
              <span>PROFILE</span>
            </div>
            <div
              onClick={() => setEditingName(true)}
              className="flex items-center mt-4 space-x-2 jsutify-between"
            >
              <span>Name</span>
              <span className="text-primary-light">@username</span>
              <MdNavigateNext />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Profile picture</span>
              <span className="text-primary-light"></span>
              <MdNavigateNext />
            </div>
            <div className="flex items-center mt-4 space-x-2 jsutify-between">
              <span>Home node</span>
              <span className="text-primary-light">Home Node Title</span>
              <MdNavigateNext />
            </div>
          </div>
          {/* payment */}
          <div className="container">
            <div className="flex items-center space-x-2 text-sm text-primary-light">
              <MdAttachMoney />
              <span>PAYMENT</span>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="fixed top-0 left-0 z-40 flex flex-row w-screen h-screen bg-primary-darkest">
      {/* sidepanel */}
      <div className="p-3 border border-primary-darker w-60">
        {/* header */}
        <div className="flex items-center space-x-2 text-lg jsutify-between">
          <button onClick={() => setEditingSettings(false)}>
            <MdArrowBack className="text-2xl" />
          </button>
          <h1>Settings</h1>
        </div>
        {/* settings navigation */}
        <nav className="mt-4">
          {/* account */}
          <>
            <div className="w-full mt-6 border rounded-full border-primary-dark"></div>
            <div className="flex items-center my-2 space-x-2 text-sm font-bold text-primary-light">
              <MdPerson />
              <span>ACCOUNT</span>
            </div>
            {editingEmail ? (
              <button
                onClick={() => changeToEditingEmail()}
                className="btn-menu text-secondary-light"
              >
                Email
              </button>
            ) : (
              <button
                onClick={() => changeToEditingEmail()}
                className="btn-menu"
              >
                Email
              </button>
            )}

            {editingPassword ? (
              <button
                onClick={() => changeToEditingPassword()}
                className="btn-menu text-secondary-light"
              >
                Password
              </button>
            ) : (
              <button
                onClick={() => changeToEditingPassword()}
                className="btn-menu"
              >
                Password
              </button>
            )}

            {deletingAccount ? (
              <button
                onClick={() => changeToDeletingAccount()}
                className="btn-menu text-secondary-light"
              >
                Delete account
              </button>
            ) : (
              <button
                onClick={() => changeToDeletingAccount()}
                className="btn-menu"
              >
                Delete account
              </button>
            )}
          </>
          {/* profile */}
          <>
            <div className="w-full mt-6 border rounded-full border-primary-dark"></div>
            <div className="flex items-center my-2 space-x-2 text-sm font-bold text-primary-light">
              <MdAccountCircle />
              <span>PROFILE</span>
            </div>
            {editingName ? (
              <button
                onClick={() => changeToEditingName()}
                className="btn-menu text-secondary-light"
              >
                Name
              </button>
            ) : (
              <button
                onClick={() => changeToEditingName()}
                className="btn-menu"
              >
                Name
              </button>
            )}

            <button className="btn-menu">Profile picture</button>
            <button className="btn-menu">Home node</button>
          </>

          {/* payment */}
          <>
            <div className="w-full mt-6 border rounded-full border-primary-dark"></div>
            <div className="flex items-center my-2 space-x-2 text-sm font-bold text-primary-light">
              <MdAttachMoney />
              <span>PAYMENT</span>
            </div>
          </>
        </nav>
      </div>
      <div className="p-3">
        {editingEmail ? (
          <>
            {/* header */}
            <h1 className="text-lg">Edit Email</h1>
            <AuthProvider>
              <EditEmail />
            </AuthProvider>
          </>
        ) : editingPassword ? (
          <>
            {/* header */}
            <h1 className="text-lg">Edit Password</h1>
            <AuthProvider>
              <EditPassword />
            </AuthProvider>
          </>
        ) : deletingAccount ? (
          <>
            {/* header */}
            <h1 className="text-lg">Delete Account</h1>
            <AuthProvider>
              <DeleteAccount />
            </AuthProvider>
          </>
        ) : editingName ? (
          <>
            {/* header */}
            <h1 className="text-lg">Edit Name</h1>
            <AuthProvider>
              <EditName />
            </AuthProvider>
          </>
        ) : (
          <span>placeholder</span>
        )}
      </div>
    </div>
  );
}
