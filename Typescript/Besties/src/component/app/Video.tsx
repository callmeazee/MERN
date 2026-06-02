/*
import Button from "../shared/Button";
    const Video = () => {
  return (
    <div className="space-y-8">
      <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden">
        <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

        <button className="absolute bottom-4 right-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md">
          Rahul Kumar
        </button>

        <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-white/30">
          <i className="ri-fullscreen-exit-line"></i>
        </button>
      </div>

      <div
        // className="grid grid-cols-3 gap-4"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
          <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
          <button className="absolute bottom-2 right-2 text-xs px-2.5 py-1 rounded-lg text-white bg-white/30 ">
            Rahul Kumar
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button className="bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white">
            <i className="ri-video-on-ai-line"></i>
          </button>

          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-400 hover:text-white">
            <i className="ri-mic-line"></i>
          </button>

          <button className="bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-400 hover:text-white">
            <i className="ri-mic-line"></i>
          </button>
        </div>
        <Button icon="close-circle-fill" type="danger">
          End
        </Button>
      </div>
    </div>
  );
}

export default Video */

import Button from "../shared/Button";

const Video = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* MAIN VIDEO TRACK CONTAINER */}
      <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden">
        <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

        {/* Username Label */}
        <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md">
          Rahul Kumar (You)
        </button>

        {/* Controls Overlay */}
        <button className="absolute bottom-4 right-4 text-xs p-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 bg-black/40 backdrop-blur-md active:scale-95">
          <i className="ri-fullscreen-line text-sm"></i>
        </button>
      </div>

      {/* SECONDARY PARTICIPANTS GRID */}
      {/* Mobile: 1 column | Desktop: 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Participant Item 1 */}
        <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
          <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
          <button className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-md text-white bg-black/50 backdrop-blur-sm">
            Rahul Kumar
          </button>
        </div>

        {/* Participant Item 2 Placeholder */}
        <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
            <span>Camera Off</span>
          </div>
        </div>

        {/* Participant Item 3 Placeholder */}
        <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
            <span>Camera Off</span>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL MEDIA ACTION ROW */}
      {/* Mobile: Wraps to layout naturally | Desktop: Spread row split */}
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Toggle Panel Buttons */}
        <div className="flex items-center gap-3">
          {/* Camera Button */}
          <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
            <i className="ri-vidicon-line text-xl"></i>
          </button>

          {/* Microphone Button */}
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

          {/* Screen Share Button */}
          <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
            <i className="ri-computer-line text-xl"></i>
          </button>
        </div>

        {/* End Call Action Button */}
        <div className="w-full sm:w-auto">
          <Button
            icon="close-circle-fill"
            type="danger"
          >
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Video;