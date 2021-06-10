import React, { useState } from "react";

// importing icons
import { MdArrowBack } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";

export default function AddPrize({ setEditingPrize }) {
  const [disabled, setDisabled] = useState(true);
  const [amount, setAmount] = useState(0);

  return (
    <div className="m-2">
      {/* header */}
      <div className="flex items-center justify-between text-lg">
        <button onClick={() => setEditingPrize(false)}>
          <MdArrowBack className="text-2xl" />
        </button>
        <h1>Add Prize</h1>
      </div>
      <div className="container bg-primary-darker">
        {/* prize */}
        <form className="space-y-7">
          <div className="flex-col justify-center">
            <label className="text-primary-light" htmlFor="name">
              Prize amount
            </label>
            <div className="inline-flex items-center text-4xl ">
              <span>$</span>
              <input
                className="text-4xl input"
                type="number"
                id="prizeAmount"
                placeholder={amount}
              />
            </div>
          </div>

          <div className="form-field">
            <textarea
              className="input"
              rows="5"
              id="bio"
              placeholder=" "
            ></textarea>
            <label className="label" htmlFor="description">
              Conditions
            </label>
          </div>
          <button type="button" className="btn-light" disapled={disabled}>
            Pay ${amount}
          </button>
        </form>
        <div className="grid items-center grid-cols-4 grid-rows-2 mt-4 text-primary-light justify-items-start ">
          <MdCreditCard className="row-span-2 text-5xl" />
          <span className="col-span-3 ">Pay using card ending in 0000</span>
          <button className="col-span-3 link">Switch payment method</button>
        </div>
      </div>
    </div>
  );
}
