import React from "react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { uuid } from "uuidv4";

export default function EditNode({
  currNode,
  setCurrNode,
  setEditing,
  updateGraph,
  createLink,
  removeLink,
}) {
  const [sourceInput, setSourceInput] = useState("");
  const [targetInput, setTargetInput] = useState("");

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 text-lg">
        <div>
          <h3>Edit Node</h3>
        </div>
        <div className="">
          <button className="" onClick={() => setEditing(false)}>
            <MdClose></MdClose>
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <label className="label" for="title">
            Title
          </label>
          <div>
            <input
              className="w-full input"
              type="text"
              id="title"
              placeholder="Title"
              value={currNode.title}
              onInput={(e) =>
                setCurrNode({ ...currNode, title: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label className="label" for="description">
              Description
            </label>
            <div className="">
              <textarea
                className="w-full input"
                rows="5"
                id="description"
                placeholder="Description"
                value={currNode.description}
                onInput={(e) =>
                  setCurrNode({ ...currNode, description: e.target.value })
                }
              ></textarea>
            </div>
          </div>
        </div>
        <form>
          <div className="mt-4">
            <h4>Incoming Links</h4>
            <div className="">
              <label className="label" for="createInLink">
                Source
              </label>
              <div className="inline-flex space-x-1">
                <input
                  className="input"
                  type="text"
                  id="createInLink"
                  placeholder="Source node ID"
                  value={sourceInput}
                  onInput={(e) => setSourceInput(e.target.value)}
                ></input>
                <div className="">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => createLink(sourceInput, currNode.id)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>

            <ul>
              {currNode.inLinks.map((link) => {
                return (
                  <li key={uuid}>
                    <span>{link}</span>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => removeLink(link, currNode.id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4">
            <h4>Outgoing Links</h4>
            <div className="">
              <label className="label" for="createOutLink">
                Target
              </label>
              <div className="inline-flex space-x-1">
                <div>
                  <input
                    className="input"
                    type="text"
                    id="createOutLink"
                    placeholder="Target node ID"
                    value={targetInput}
                    onInput={(e) => setTargetInput(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => createLink(currNode.id, targetInput)}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
            <ul>
              {currNode.outLinks.map((link) => {
                return (
                  <li>
                    <span>{link}</span>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => removeLink(currNode.id, link)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <button className="btn" type="button" onClick={updateGraph}>
            Save
          </button> */}
        </form>
      </div>
    </div>
  );
}
