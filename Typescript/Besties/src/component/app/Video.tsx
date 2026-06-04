import Button from "../shared/Button";

const Video = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* MAIN VIDEO TRACK CONTAINER */}
      {/* Added 'isolate' to ensure the video rendering plane respects overflow-hidden rounded borders */}
      <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden isolate">
        <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

        {/* Username Label - Pinned Left */}
        <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md z-10">
          Rahul Kumar (You)
        </button>

        {/* Controls Overlay - Pinned Right */}
        <button className="absolute bottom-4 right-4 text-xs p-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 bg-black/40 backdrop-blur-md active:scale-95 z-10">
          <i className="ri-fullscreen-line text-sm"></i>
        </button>
      </div>

      {/* SECONDARY PARTICIPANTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Participant Item 1 */}
        <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow isolate">
          <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
          {/* FIX: Aligned name tag to bottom-left to match the layout consistency of the main screen */}
          <button className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded-md text-white bg-black/50 backdrop-blur-sm z-10">
            Rahul Kumar
          </button>
        </div>

        {/* Participant Item 2 Placeholder */}
        {/* FIX: Removed flex from parent grid block because height is 0 */}
        <div className="bg-zinc-900 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
          {/* FIX: Moved flex rules to the absolute container so alignment elements calculate true centers correctly */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-1.5 bg-zinc-900">
            <i className="ri-vidicon-off-line text-lg opacity-80"></i>
            <span className="text-[11px] font-medium tracking-wide">
              Azee Khan
            </span>
          </div>
        </div>

        {/* Participant Item 3 Placeholder */}
        <div className="bg-zinc-900 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-1.5 bg-zinc-900">
            <i className="ri-vidicon-off-line text-lg opacity-80"></i>
            <span className="text-[11px] font-medium tracking-wide">
              John Adams
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL MEDIA ACTION ROW */}
      {/* FIX: Using items-center and justify-center/justify-between with explicit mobile padding balances the row layout items */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
        {/* Toggle Panel Buttons Row */}
        {/* FIX: Explicitly keeping these centered on mobile viewports */}
        <div className="flex items-center justify-center gap-3 w-auto">
          {/* Camera Button (Only in Video.tsx - remove this button line if pasting into Audio.tsx) */}
          <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
            <i className="ri-vidicon-line text-xl"></i>
          </button>

          {/* Microphone Button */}
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

          {/* Screen Share / Extra Button (Only in Video.tsx - remove if pasting into Audio.tsx) */}
          <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
            <i className="ri-computer-line text-xl"></i>
          </button>
        </div>

        {/* End Call Action Button Wrapper Container */}
        {/* FIX: Forced the wrapper to take full width on mobile so the shared Button stretches edge-to-edge layout paths cleanly */}
        <div className="w-full sm:w-auto flex justify-center">
          <Button
            icon="close-circle-fill"
            type="danger"
            className="w-full sm:w-auto justify-center py-3 text-center flex items-center">
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Video;
