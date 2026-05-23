import { useState } from "react";


const Ex1 = () => {
  const [show, setShow] = useState(true)
  return (
    <div>
      <h1>Build a show/hide image functionality in React</h1>
      <div>
        {show && <img src="./download.jpg" />}
        <button onClick={() => setShow(!show)}>
          {show ? "hide" : "show"}
        </button>
      </div>
    </div>
  );
}

export default Ex1