import React from "react";
import PlansCard from "../layouts/PlansCard";

const Plans = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center md:px-32 px-5">
      <h1 className=" text-4xl font-semibold text-center">Gym membership</h1>

      <div className=" flex flex-col md:flex-row justify-between mt-10 gap-8">
        <PlansCard title="3 months Plan" price="1000" />
        <PlansCard title="6 months Plan" price="3000" />
        <PlansCard title="9 months Plan" price="5000" />
      </div>
    </div>
  );
};

export default Plans;
