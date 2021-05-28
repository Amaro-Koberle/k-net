import React from "react";
import { useState, useEffect } from "react";

//importing components
import EditInLinks from "./EditInLinks";
import EditOutLinks from "./EditOutLinks";
import DiscardNodeChangesPopUp from "./DiscardNodeChangesPopUp";
import DeleteNodePopUp from "./DeleteNodePopUp";
import CreateInLink from "./CreateInLink";
import CreateOutLink from "./CreateOutLink";
import EditPrize from "./EditPrize";

//importing icons
import { MdArrowBack } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";

//importing profile picture
import profilePicture from "../KarlPopper.jpg";

export default function EditNode({
  focusedNode,
  setFocusedNode,
  setEditingNode,
  deleteNode,
  createLink,
  selection,
  graph,
  removeLink,
  updateGraph,
}) {
  // is the discard node changes pop-up currently being displayed?
  const [displayDiscardNodeChangesPopUp, setDisplayDiscardNodeChangesPopUp] =
    useState(false);

  // is the discard node pop-up currently being displayed?
  const [displayDiscardNodePopUp, setDisplayDiscardNodePopUp] = useState(false);

  // is the delete node pop-up currently being displayed?
  const [displayDeleteNodePopUp, setDisplayDeleteNodePopUp] = useState(false);

  // is the user currently creating an incoming link?
  const [creatingInLink, setCreatingInLink] = useState(false);

  // is the user currently creating an outgoing link?
  const [creatingOutLink, setCreatingOutLink] = useState(false);

  // is the user currently editing the node prize?
  const [editingPrize, setEditingPrize] = useState(false);

  // has the user changed the content of the node?
  const [nodeContentWasChanged, setNodeContentWasChanged] = useState(false);

  // is the post/save button currently disabled?
  const [postingDisabled, setPostingDisabled] = useState(true);

  // TODO are the outgoing links being displayed?
  const [displayOutgoingLinks, setDisplayOutgoingLinks] = useState(false);

  // TODO has the user added a prize to the node?
  const [prizeWasAdded, setPrizeWasAdded] = useState(false);

  // TODO prevent submitting the form if required fields aren't filled in
  const [requiredInputsFilled, setRequiredInputsFilled] = useState(false);

  // this is just a placeholder
  const userName = "Karl Popper";

  // posting the node
  const postingNode = () => {
    updateGraph();
    setEditingNode(false);
  };

  // deleting the node
  const deletingNode = () => {
    deleteNode(focusedNode.id);
    setDisplayDeleteNodePopUp(false);
    setEditingNode(false);
  };

  // recording wether the user has changed the content of the node
  useEffect(() => {
    setNodeContentWasChanged(true);
  }, [focusedNode.title]);
  useEffect(() => {
    setNodeContentWasChanged(true);
  }, [focusedNode.description]);

  return (
    <>
      {
        // pop-ups
        // TODO I don't want this pop-up to appear if the user hasn't made any changes
        displayDiscardNodeChangesPopUp && nodeContentWasChanged ? (
          <DiscardNodeChangesPopUp
            setEditingNode={setEditingNode}
            setDisplayDiscardNodeChangesPopUp={
              setDisplayDiscardNodeChangesPopUp
            }
          />
        ) : displayDeleteNodePopUp ? (
          <DeleteNodePopUp
            deletingNode={deletingNode}
            setDisplayDeleteNodePopUp={setDisplayDeleteNodePopUp}
          />
        ) : displayDiscardNodePopUp ? (
          <DeleteNodePopUp
            setEditingNode={setEditingNode}
            setDisplayDiscardNodePopUp={setDisplayDiscardNodePopUp}
          />
        ) : // edit prize
        editingPrize ? (
          <EditPrize setEditingPrize={setEditingPrize} />
        ) : // create links
        creatingInLink ? (
          <CreateInLink
            setCreatingInLink={setCreatingInLink}
            selection={selection}
            focusedNode={focusedNode}
            setFocusedNode={setFocusedNode}
            createLink={createLink}
          />
        ) : creatingOutLink ? (
          <CreateOutLink
            setCreatingOutLink={setCreatingOutLink}
            selection={selection}
            focusedNode={focusedNode}
            setFocusedNode={setFocusedNode}
            createLink={createLink}
          />
        ) : (
          <>
            {/* header */}
            <div className="grid items-center grid-cols-3 px-2 text-lg jsutify-between">
              <button
                className="text-2xl"
                onClick={() => setDisplayDiscardNodeChangesPopUp(true)}
              >
                <MdArrowBack />
              </button>
              <h1 className="justify-self-center">Edit Node</h1>
              <div className="space-x-2 justify-self-end">
                <button
                  type="button"
                  onClick={() => setDisplayDeleteNodePopUp(true)}
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => postingNode()}
                  className="font-bold link"
                  type="button"
                  disabled={postingDisabled}
                >
                  Post
                </button>
              </div>
            </div>
            <>
              <div className="container bg-primary-darker">
                {/* author */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <img
                      className="border rounded-full w-9 h-9 border-secondary-light"
                      src={profilePicture}
                      alt={userName}
                    />
                    <span className="link">{userName}</span>
                  </div>
                  {/* visibility */}
                  <select className="select" id="visibility">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                {/* title and description */}
                <form className="mt-4 space-y-7">
                  <div className="form-field">
                    <input
                      className="input"
                      type="text"
                      id="title"
                      placeholder=" "
                      value={focusedNode.title}
                      onInput={(e) =>
                        setFocusedNode({
                          ...focusedNode,
                          title: e.target.value,
                        })
                      }
                    />
                    <label className="label" htmlFor="title">
                      Title
                    </label>
                  </div>
                  <div className="form-field">
                    <textarea
                      className="input"
                      rows="5"
                      id="description"
                      placeholder=" "
                      value={focusedNode.description}
                      onInput={(e) =>
                        setFocusedNode({
                          ...focusedNode,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                    <label className="label" htmlFor="description">
                      Description
                    </label>
                  </div>
                </form>
              </div>
              {/* prize */}
              {prizeWasAdded ? (
                <div className="conatiner">
                  <div className="form-field">
                    <input
                      className="input"
                      type="number"
                      id="amount"
                      placeholder=" "
                      value={focusedNode.title}
                      onInput={(e) =>
                        setFocusedNode({
                          ...focusedNode,
                          title: e.target.value,
                        })
                      }
                    />
                    <label className="label" htmlFor="amount">
                      Amount
                    </label>
                  </div>
                  <div>
                    <textarea
                      className="input"
                      rows="5"
                      id="conditions"
                      placeholder=" "
                      value={focusedNode.description}
                      onInput={(e) =>
                        setFocusedNode({
                          ...focusedNode,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                    <label className="label" htmlFor="conditions">
                      Prize conditions
                    </label>
                  </div>
                </div>
              ) : (
                <div className="container">
                  <button
                    onClick={() => setEditingPrize(true)}
                    className="btn-light"
                    type="button"
                  >
                    Add prize
                  </button>
                </div>
              )}
            </>
            {/* link tabs */}
            <div className="container">
              {displayOutgoingLinks ? (
                <>
                  {/* outgoing links tab */}
                  <div className="grid grid-cols-2 justify-items-center">
                    <div onClick={() => setDisplayOutgoingLinks(false)}>
                      <span className="mt-4 text-sm text-primary-light">
                        Incoming links
                      </span>
                    </div>
                    <div>
                      <span className="mt-4 text-sm font-bold text-primary-lightest">
                        Outgoing links
                      </span>
                      <div className="flex items-center w-full border-2 rounded-full border-primary-lightest"></div>
                    </div>
                  </div>
                  {/* outgoing links */}
                  <EditOutLinks
                    setCreatingOutLink={setCreatingOutLink}
                    focusedNode={focusedNode}
                    removeLink={removeLink}
                    graph={graph}
                  />
                </>
              ) : (
                <>
                  {/* incoming links tab */}
                  <div className="grid grid-cols-2 justify-items-center">
                    <div>
                      <span className="mt-4 text-sm font-bold text-primary-lightest">
                        Incoming links
                      </span>
                      <div className="flex items-center w-full border-2 rounded-full border-primary-lightest"></div>
                    </div>
                    <div onClick={() => setDisplayOutgoingLinks(true)}>
                      <span className="mt-4 text-sm text-primary-light">
                        Outgoing links
                      </span>
                    </div>
                  </div>
                  {/* incoming links */}
                  <EditInLinks
                    setCreatingInLink={setCreatingInLink}
                    focusedNode={focusedNode}
                    removeLink={removeLink}
                    graph={graph}
                  />
                </>
              )}
            </div>
          </>
        )
      }
    </>
  );
}
