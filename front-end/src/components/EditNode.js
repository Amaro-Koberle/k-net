import React from "react";
import { useState } from "react";

//importing components
import EditInLinks from "./EditInLinks";
import EditOutLinks from "./EditOutLinks";
import DiscardNodeChangesPopUp from "./DiscardNodeChangesPopUp";
import DeleteNodePopUp from "./DeleteNodePopUp";
import CreateInLink from "./CreateInLink";
import CreateOutLink from "./CreateOutLink";

//importing icons
import { MdArrowBack } from "react-icons/md";
import { MdDelete } from "react-icons/md";

//importing profile picture
import profilePicture from "../KarlPopper.jpg";

export default function EditNode({
  focusedNode,
  setFocusedNode,
  setEditingNode,
  deleteNode,
  createLink,
  handleNodeClick,
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

  const [creatingInLink, setCreatingInLink] = useState(false);
  const [creatingOutLink, setCreatingOutLink] = useState(false);

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

  // creating link
  // useEffect(() => {
  //   if (creatingInLink === true) {
  //     createLink(focusedNode, selection[1]);
  //     setFocusedNode(selection[1]);
  //     setCreatingInLink(false);
  //   } else if (creatingOutLink === true) {
  //     createLink(selection[1], focusedNode);
  //     setFocusedNode(selection[1]);
  //     setCreatingOutLink(false);
  //   }
  //   console.log("selection changed");
  // }, [selection]);

  return (
    <>
      {
        // pop-ups
        displayDiscardNodeChangesPopUp ? (
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
          <div className="fixed top-0 left-0 z-40 w-screen h-screen p-3 bg-opacity-75 bg-gray-darkest border-gray-darker">
            {/* header */}
            <div className="flex items-center text-lg jsutify-between">
              <div className="flex items-center space-x-2">
                <button onClick={() => setDisplayDiscardNodeChangesPopUp(true)}>
                  <MdArrowBack />
                </button>
                <h3>Edit Node</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setDisplayDeleteNodePopUp(true)}
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => postingNode()}
                  className="px-5 btn bg-gray-lighter text-gray-darkest"
                  type="button"
                >
                  Post
                </button>
              </div>
            </div>
            <form>
              <div className="container bg-gray-darker">
                {/* author */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <img
                      className="w-8 h-8 border rounded-full border-gray"
                      src={profilePicture}
                      alt={userName}
                    />
                    <span>{userName}</span>
                  </div>
                  {/* visibility */}
                  <select className="select" id="visibility">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
                {/* title and description */}
                <>
                  <label className="label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full input"
                    type="text"
                    id="title"
                    value={focusedNode.title}
                    onInput={(e) =>
                      setFocusedNode({ ...focusedNode, title: e.target.value })
                    }
                  ></input>
                  <label className="label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="w-full input"
                    rows="5"
                    id="description"
                    value={focusedNode.description}
                    onInput={(e) =>
                      setFocusedNode({
                        ...focusedNode,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </>
              </div>
              {/* links */}
              <EditInLinks
                creatingInLink={creatingInLink}
                setCreatingInLink={setCreatingInLink}
                selection={selection}
                handleNodeClick={handleNodeClick}
                focusedNode={focusedNode}
                setFocusedNode={setFocusedNode}
                removeLink={removeLink}
                createLink={createLink}
                graph={graph}
              />
              <EditOutLinks
                creatingOutLink={creatingOutLink}
                setCreatingOutLink={setCreatingOutLink}
                selection={selection}
                handleNodeClick={handleNodeClick}
                focusedNode={focusedNode}
                setFocusedNode={setFocusedNode}
                removeLink={removeLink}
                createLink={createLink}
                graph={graph}
              />
            </form>
          </div>
        )
      }
    </>
  );
}
