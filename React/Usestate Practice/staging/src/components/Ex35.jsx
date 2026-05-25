const Ex35 = () => {
  return (
    <div className="bg-gray-100 min-h-screen grid grid-col-2 p-8 ">
      <h1 className="text-2xl font-semibold">
        Implement a state object that stores and updates width and height
        dynamically.
      </h1>
      <div>
        <form className="flex flex-col gap-6 mx-auto w-[400px]">
          <input
            type="text"
            name="firstName"
            className="bg-white border border-gray-300 p-3 rounded"
            placeholder="enter your first name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            className="bg-white border p-3 rounded"
            placeholder="enter your last name"
            onChange={handleChange}
          />
          <button className="bg-blue-600 text-white p-3 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-lg text-center h-fit">
        {/* <i className="ri-user-line text-8xl"></i>
    
        <p></p> */}
        <h1 className="text-xl font-medium"></h1>
        <h1 className="text-xl font-medium"></h1>
      </div>
    </div>
  );
};

export default Ex35;
