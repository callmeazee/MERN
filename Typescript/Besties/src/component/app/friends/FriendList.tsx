import { Link } from "react-router-dom";
import Avatar from "../../shared/Avatar";

const FriendList = () => {
  return (
    <div className="flex-1 min-h-0 flex flex-col p-4">
      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 shrink-0">
        My Friends
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {Array(20)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
              <Avatar
                size="md"
                image="/images/man1.png"
                title="John adams"
                subtitle={
                  <small
                    className={
                      idx % 2 === 0
                        ? "text-green-500 font-medium"
                        : "text-zinc-400"
                    }>
                    {idx % 2 === 0 ? "• Online" : "Offline"}
                  </small>
                }
              />

              <div className="flex items-center gap-3">
                <Link to="/app/chat">
                  <button
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                    title="chat">
                    <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
                  </button>
                </Link>
                <Link to="/app/audio">
                  <button
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                    title="audio call">
                    <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
                  </button>
                </Link>
                <Link to="/app/video">
                  <button
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                    title="video call">
                    <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
