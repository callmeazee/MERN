import { useState } from "react";


const Ex40 = () => {
     const UserProfile1 = () => {
          return (
            <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center gap-2">
              {/* Profile Image & Status Indicator */}
              <div className="relative w-24 h-24 mb-4">
                <img
                  className="w-full h-full rounded-full object-cover ring-4 ring-blue-50"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Sarah Jenkins"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>

              {/* User Info */}
              <div className="text-center w-full">
                <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                  Sarah Jenkins
                </h2>
                <p className="text-sm font-medium text-blue-600 mb-1">
                  Senior Product Designer
                </p>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mb-4">
                  <i className="ri-map-pin-2-line"></i> San Francisco, CA
                </p>

                <p className="text-sm text-gray-600 px-4 mb-6 leading-relaxed">
                  Building seamless user experiences and leading scalable design
                  systems at scale.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex  space-x-3 ">
                <button className="flex-1 py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer">
                  <i className="ri-user-add-line text-base"></i> Connect
                </button>
                <button className="flex-1 py-2 px-6 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer">
                  <i className="ri-chat-3-line text-base"></i> Message
                </button>
              </div>

              {/* Footer Socials */}
              <div className="flex gap-4 text-gray-400 border-t border-gray-100 pt-4 w-full justify-center">
                <a href="#" className="hover:text-blue-600 transition">
                  <i className="ri-linkedin-box-fill text-xl"></i>
                </a>
                <a href="#" className="hover:text-gray-900 transition">
                  <i className="ri-github-fill text-xl"></i>
                </a>
                <a href="#" className="hover:text-pink-600 transition">
                  <i className="ri-dribbble-line text-xl"></i>
                </a>
              </div>
            </div>
          );
     }
     
     const UserProfile2 = () => {
          return (
            <div className="max-w-sm mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              {/* Creative Background Header Banner */}
              <div className="h-28 bg-gradient-to-r from-violet-600 to-indigo-600 relative">
                <div className="absolute top-4 right-4 bg-slate-900/40 backdrop-blur-sm text-xs font-semibold text-white px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <i className="ri-verified-badge-fill text-indigo-400"></i> PRO
                </div>
              </div>

              {/* Card Content Shifted Upwards */}
              <div className="px-6 pb-6 relative -mt-12">
                <div className="flex justify-between items-end mb-4">
                  <img
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-900 bg-slate-800"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                    alt="Alex Rivera"
                  />
                  {/* Quick Stats right aligned to image */}
                  <div className="flex gap-4 text-center mb-1 pr-2">
                    <div>
                      <p className="text-sm font-bold text-slate-100">4.2k</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Followers
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-100">182</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Projects
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-100">
                    Alex Rivera
                  </h2>
                  <p className="text-sm text-slate-400">@alex_codes</p>
                </div>

                {/* Tech Skill Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="text-xs font-medium bg-slate-800 text-indigo-400 px-2.5 py-1 rounded-lg border border-slate-700">
                    Next.js
                  </span>
                  <span className="text-xs font-medium bg-slate-800 text-cyan-400 px-2.5 py-1 rounded-lg border border-slate-700">
                    Tailwind
                  </span>
                  <span className="text-xs font-medium bg-slate-800 text-amber-400 px-2.5 py-1 rounded-lg border border-slate-700">
                    AWS
                  </span>
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center gap-2 border-t border-slate-800 pt-4">
                  <button className="flex-1 py-2.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-medium text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer">
                    <i className="ri-mail-send-line"></i> Hire Me
                  </button>
                  <button className="w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition duration-200 flex items-center justify-center cursor-pointer">
                    <i className="ri-star-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          );
     }

     const [profile, setProfile] = useState(false)
     const handleClick = () => {
          setProfile(!profile)
     }

  return (
    <div className="flex flex-col items-center   w-full min-h-screen bg-gray-300 gap-12 p-4">
      <h1 className="font-medium text-2xl text-center">
        Build a component that switches between two different user profiles
        stored in state.
      </h1>

      {profile ? <UserProfile1 /> : <UserProfile2 />}

      <button
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg text-white "
        onClick={handleClick}>
        Switch Profile
      </button>
    </div>
  );
}

export default Ex40