import { useState } from "react";

const Ex11 = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Build a show/hide paragraph functionality.
        </h1>

        {/* <p hidden = {show} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, adipisci a, recusandae corrupti dolore assumenda, sapiente sit eaque qui blanditiis earum. Quos quibusdam consequatur nostrum maiores nemo facilis dicta alias?
        </p> */}
                 {
                      show &&
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, esse. Quia, accusamus dolores? Adipisci consequuntur voluptates architecto, animi eius veritatis laudantium ratione pariatur. Facilis, ad?</p>
                 }
        <button
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
          onClick={() => setShow(!show)}>
          {show ? "Hide Para" : "Show Para"}
        </button>
      </div>
    </div>
  );
};

export default Ex11;
