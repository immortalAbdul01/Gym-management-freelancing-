import React from "react";
import img from "../assets/img/about.png";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col md:flex-row items-center md:mx-32 mx-5">
      <div>
        <h1 className="text-5xl font-semibold text-center md:text-start mt-14 md:mt-0">
          About Us
        </h1>

        <div className=" w-full md:w-3/4 space-y-5 mt-4">
          <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit hic cumque quibusdam eos, temporibus veniam expedita earum odit eligendi obcaecati dolorum quaerat pariatur!
          </p>

          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint accusantium tempore possimus odio repellendus. Quibusdam, culpa veritatis consectetur dolore voluptates excepturi asperiores reprehenderit?
          </p>
        </div>
      </div>
      <div>
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
