import Card from "../../shared/Card";
import Button from "../../shared/Button";
import useSWR, { mutate } from "swr";
import Fetcher from "../../../lib/Fetcher";
import Loader from "../../shared/Loader";
import NotFound from "../../shared/NotFound";
import CatchError from "../../../lib/CatchError";
import HttpInterceptor from "../../../lib/HttpInterceptor";
import { Link } from "react-router-dom";

interface FriendDataInterface {
  id: string;
  fullname: string | null;
  email: string;
  image: string | null;
}
interface FriendInterface {
  _id: string;
  status: string;
  friend: FriendDataInterface;
}

const Friends = () => {
  const { data: friendsList, isLoading, error } = useSWR("/friend", Fetcher);

  if (isLoading) return <Loader />;
  if (error || !friendsList) return <NotFound />;

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`);
      mutate("/friend");
    } catch (err) {
      CatchError(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* DIRECTORY HEADER METRICS ROW */}
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm font-medium text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {friendsList.length}
          </span>{" "}
          active connections
        </p>
      </div>

      {/* DYNAMIC RESPONSIVE GRID CONFIGURATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {friendsList.map((item: FriendInterface, idx: number) => {
          // Dynamic Avatar Initials Generation
          const initials = item.friend.fullname
            ? item.friend.fullname
                .trim()
                .split(/\s+/)
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "??";

          return (
            <Card
              key={item._id || idx}
              noPadding
              className="hover:shadow-xl transition-all duration-300 group relative">
              {/* 1. TOP RIGHT INFO BUTTON */}
              <button
                onClick={() =>
                  alert(`Opening details profile for: ${item.friend.fullname}`)
                }
                className="absolute top-3 right-3 text-slate-400 hover:text-indigo-600 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors z-10"
                title="View Details">
                <i className="ri-information-line text-lg leading-none"></i>
              </button>

              <div className="flex flex-col items-center justify-center p-5 text-center">
                {/* Profile Image Wrapper Frame */}
                <div className="relative mb-3.5 p-1 rounded-full bg-slate-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  {item.friend.image ? (
                    <img
                      src={item.friend.image}
                      alt={`${item.friend.fullname} profile`}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {initials}
                    </div>
                  )}
                  {/* Active Live Status Dot */}
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm animate__animated animate__pulse animate__infinite"></span>
                </div>

                {/* Text Block Node Layout */}
                <h3 className="text-base font-bold text-slate-800 mb-3.5 tracking-tight leading-none truncate w-full capitalize">
                  {item.friend.fullname}
                </h3>

                {/* 2. CHAT, AUDIO, VIDEO COMMUNICATION ACTION ICONS ROW */}
                {item.status === "accepted" && (
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {/* Chat Trigger Button */}
                    <Link
                      to="/app/chat"
                      // onClick={() =>
                      //   alert(`Starting chat with ${item.friend.fullname}`)
                      // }
                      className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="Send Message">
                      <i className="ri-chat-3-line text-base"></i>
                    </Link>

                    {/* Audio Call Trigger Button */}
                    <Link
                      to="/app/audio"
                      // onClick={() => alert(`Calling ${item.friend.fullname}`)}
                      className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="Audio Call">
                      <i className="ri-phone-line text-base"></i>
                    </Link>

                    {/* Video Call Trigger Button */}
                    <Link
                      to="/app/video"
                      // onClick={() =>
                      //   alert(
                      //     `Starting video call with ${item.friend.fullname}`,
                      //   )
                      // }
                      className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                      title="Video Call">
                      <i className="ri-vidicon-line text-base"></i>
                    </Link>
                  </div>
                )}

                {/* PRIMARY SYSTEM ACTIONS CTAS */}
                {item.status === "accepted" ? (
                  <Button
                    type="danger"
                    icon="user-minus-line"
                    className="w-full text-xs py-2 rounded-xl justify-center font-semibold bg-rose-500/50 hover:bg-rose-500 hover:text-white text-rose-500 border border-rose-100 shadow-none hover:scale-100"
                    onClick={() => unfriend(item._id)}>
                    Unfriend
                  </Button>
                ) : (
                  <Button
                    type="info"
                    icon="check-double-line"
                    className="w-full text-xs py-2.5 rounded-xl justify-center font-semibold bg-gray-500/50 hover:bg-gray-500 hover:text-white text-gray-600 border border-gray-100 shadow-none hover:scale-100 capitalize mt-2"
                    onClick={() =>
                      alert(`Current Request status: ${item.status}`)
                    }>
                    {item.status}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
