import { useState } from "react";

const Ex38 = () => {
     const [profile, setProfile] = useState({
          image: "https://img.favpng.com/6/21/10/3d-woman-avatar-3d-cartoon-girl-with-brown-hair-M7DPxRTU_t.jpg",
          name: "Jessica Alba",
          email: "jessicaalba@zeecorp.com",
          role: "Lawyer"
     })
     const handleChange = (e) => {
          const input = e.target
          const key = input.name 
          //for profile photo
          const value = (key === "image" ? URL.createObjectURL(input.files[0]) :  input.value)

          setProfile({
               ...profile,
               [key] : value
          })
          
     }
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="w-11/12 md:w-8/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-12">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-2 h-fit">
          <h1 className="text-xl font-semibold text-center">Add Info</h1>
          <form className="mt-6 flex flex-col gap-4 w-full">
            <input
              type="file"
              className="bg-slate-200 p-2.5 rounded w-full text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-slate-300 file:cursor-pointer"
              name="image"
              accept="image/*"
                  onChange={handleChange}
            />
            <input
              type="text"
              className="border-2 border-slate-200 p-2.5 rounded w-full"
              name="name"
              placeholder="enter your name"
                  onChange={handleChange}
            />
            <input
              type="text"
              className="border border-slate-200 p-2.5 rounded w-full"
              name="email"
              placeholder="enter your email"
                  onChange={handleChange}
            />
            <input
              type="text"
              className="border border-slate-200 p-2.5 rounded w-full"
              name="role"
              placeholder="enter your profession"
                  onChange={handleChange}
            />
          </form>
        </div>
        <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-1 h-fit">
          <img
            src={profile.image}
            className="w-[150px] h-[200px] object-cover rounded"
            alt="avatar"
          />
          <h1 className="text-2xl font-semibold mt-2">{profile.name }</h1>
          <p className="text-gray-500 break-all text-center">
            {profile.email}
          </p>
          <p className="text-gray-500 text-xs font-medium">
           {profile.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ex38;
