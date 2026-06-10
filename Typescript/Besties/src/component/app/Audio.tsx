import Button from "../shared/Button";
import Card from "../shared/Card";

const Audio = () => {
  // Mock participant array to clean up repeated code and scale dynamically
  const participants = [
    { name: "Azee Khan", initials: "AK", isSpeaking: true, image: "" },
    { name: "Rahul Kumar", initials: "RK", isSpeaking: false, image: "" },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* PARTICIPANTS AUDIO CARD GRID */}
      {/* Mobile: 1 Col | Tablet: 2 Cols | Desktop: 3 Cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {participants.map((user, idx) => (
          <Card
            key={idx}
            title={
              <div className="text-center w-full font-semibold text-slate-700">
                {user.name}
              </div>
            }>
            <div className="flex flex-col items-center justify-center py-6">
              {/* Responsive Avatar Container with Speaking Indicator Ring */}
              <div
                className={`relative p-1.5 rounded-full transition-all duration-300 ${
                  user.isSpeaking
                    ? "bg-emerald-500/10 ring-4 ring-emerald-500 animate-pulse"
                    : "bg-slate-100 ring-2 ring-slate-200"
                }`}>
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name} avatar`}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  // Fallback sleek background circle if image src is blank/broken
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-inner">
                    {user.initials}
                  </div>
                )}

                {/* Micro Audio Wave Icon overlay indicating active microphone status */}
                <div
                  className={`absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    user.isSpeaking
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-400 text-white"
                  }`}>
                  <i
                    className={
                      user.isSpeaking
                        ? "ri-mic-line animate-bounce"
                        : "ri-mic-off-line"
                    }></i>
                </div>
              </div>

              {/* Status Label under Avatar */}
              <span
                className={`text-xs font-medium mt-4 ${user.isSpeaking ? "text-emerald-600" : "text-slate-400"}`}>
                {user.isSpeaking ? "Speaking..." : "Muted"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* BOTTOM CONTROL MEDIA ACTION ROW */}
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Toggle Panel Call Control Buttons */}
        <div className="flex items-center gap-3">
          {/* Camera Toggle Button */}
          {/* <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
            <i className="ri-vidicon-line text-xl"></i>
          </button> */}

          {/* Microphone Mute/Unmute Button */}
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

          {/* Speaker / Device Volume Option Button */}
          <button className="bg-slate-100 text-slate-600 w-12 h-12 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
            <i className="ri-volume-up-line text-xl"></i>
          </button>
        </div>

        {/* End Call Action Button */}
        <div className="w-full sm:w-auto">
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

export default Audio;
