import { useState } from "react";


const Ex23 = () => {
     const [like, setLike] = useState(false)
  return (
    <div className="flex  justify-center items-center ">
      <div className="flex flex-col gap-12">
        <h1 className="text-2xl font-semibold ">
          Implement a Like button that toggles between Liked and Unliked
        </h1>

          <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer font-medium"
          onClick={() => setLike(!like)}
          >
               {like ? "dislike" : "like"}
                 </button>
                 <p className="text-center font-semibold text-2xl">{ like ? "liked" : "Disliked"}</p>
      </div>
    </div>
  );
}

export default Ex23