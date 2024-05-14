import React, { useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import PaymentForm from "../components/PaymentForm";

const PlansCard = (props) => {
  const [showForm, setShowForm] = useState(false);

  const handleBuyPlan = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col bg-[#222] w-full md:w-1/3 p-5 rounded-lg">
      <h2 className="font-semibold text-center">{props.title}</h2>

      <div className="flex flex-row justify-center items-center">
        <span className="inline-block">

        </span>
        <h3 className="font-semibold text-xl inline-block"> {props.price}/- RS</h3>
      </div>

      <div className="flex flex-col items-center mt-5">
        <div className="flex flex-row items-center">
          <span className="inline-block mr-5">
            <AiFillCheckCircle size={22} />
          </span>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut fuga commodi maxime adipisci corporis, dolore dicta asperiores in quos, sapiente, ipsa iste alias f</p>
        </div>
        <div className="flex flex-row items-center">
          <span className="inline-block mr-5">
            <AiFillCheckCircle size={22} />
          </span>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing ?</p>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-4">
        <button onClick={handleBuyPlan} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy Plan
        </button>
      </div>

      {showForm && <PaymentForm onClose={handleCloseForm} />}
    </div>
  );
};

export default PlansCard;
