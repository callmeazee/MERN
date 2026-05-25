import { useState } from "react";

const Ex22 = () => {
     const [checked, setChecked] = useState(false)
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold text-center">
          Build a checkbox that toggles between Checked and Unchecked.
        </h1>
        <div className="flex items-center gap-8 ">
          <input
               type="checkbox"
               id="simple"
               name="checkbox"
               className=" accent-blue-600 cursor-pointer "
               style={{ height: "22px", width: "22px" }}
               checked={checked}
          //   onChange={() => setChecked(!checked)}
                           
          //   one more way to do this
               onChange= {(e) => setChecked(e.target.checked)}
          />
          <label className="text-slate-700 cursor-pointer font-medium text-2xl">
            toggle checkbox
          </label>
               <p>{checked === true ? "Checked" : "Unchecked" }</p>
        </div>
      </div>
    </div>
  );
};

export default Ex22;
