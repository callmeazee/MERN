// import Card from "../../shared/Card";
// import Button from "../../shared/Button";
// import useSWR, { mutate } from "swr";
// import Fetcher from "../../../lib/Fetcher";
// import Loader from "../../shared/Loader";
// import NotFound from "../../shared/NotFound";
// import CatchError from "../../../lib/CatchError";
// import HttpInterceptor from "../../../lib/HttpInterceptor";
// import { Link } from "react-router-dom";

// interface FriendDataInterface {
//   id: string;
//   fullname: string | null;
//   email: string;
//   image: string | null;
// }
// interface FriendInterface {
//   _id: string;
//   status: string;
//   friend: FriendDataInterface;
// }

// const Friends = () => {
//   const { data: friendsList, isLoading, error } = useSWR("/friend", Fetcher);

//   if (isLoading) return <Loader />;
//   if (error || !friendsList) return <NotFound />;

//   const unfriend = async (id: string) => {
//     try {
//       await HttpInterceptor.delete(`/friend/${id}`);
//       mutate("/friend");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* DIRECTORY HEADER METRICS ROW */}
//       <div className="flex items-center justify-between pb-2">
//         <p className="text-sm font-medium text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {friendsList.length}
//           </span>{" "}
//           active connections
//         </p>
//       </div>

//       {/* DYNAMIC RESPONSIVE GRID CONFIGURATION */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {friendsList.map((item: FriendInterface, idx: number) => {
//           // Dynamic Avatar Initials Generation
//           const initials = item.friend.fullname
//             ? item.friend.fullname
//                 .trim()
//                 .split(/\s+/)
//                 .map((w) => w[0])
//                 .join("")
//                 .toUpperCase()
//                 .slice(0, 2)
//             : "??";

//           return (
//             <Card
//               key={item._id || idx}
//               noPadding
//               className="hover:shadow-xl transition-all duration-300 group relative">
//               {/* 1. TOP RIGHT INFO BUTTON */}
//               <button
//                 onClick={() =>
//                   alert(`Opening details profile for: ${item.friend.fullname}`)
//                 }
//                 className="absolute top-3 right-3 text-slate-400 hover:text-indigo-600 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors z-10"
//                 title="View Details">
//                 <i className="ri-information-line text-lg leading-none"></i>
//               </button>

//               <div className="flex flex-col items-center justify-center p-5 text-center">
//                 {/* Profile Image Wrapper Frame */}
//                 <div className="relative mb-3.5 p-1 rounded-full bg-slate-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
//                   {item.friend.image ? (
//                     <img
//                       src={item.friend.image}
//                       alt={`${item.friend.fullname} profile`}
//                       className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm bg-white"
//                       onError={(e) => {
//                         (e.target as HTMLElement).style.display = "none";
//                       }}
//                     />
//                   ) : (
//                     <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-inner">
//                       {initials}
//                     </div>
//                   )}
//                   {/* Active Live Status Dot */}
//                   <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm animate__animated animate__pulse animate__infinite"></span>
//                 </div>

//                 {/* Text Block Node Layout */}
//                 <h3 className="text-base font-bold text-slate-800 mb-3.5 tracking-tight leading-none truncate w-full capitalize">
//                   {item.friend.fullname}
//                 </h3>

//                 {/* 2. CHAT, AUDIO, VIDEO COMMUNICATION ACTION ICONS ROW */}
//                 {item.status === "accepted" && (
//                   <div className="flex items-center justify-center gap-4 mb-4">
//                     {/* Chat Trigger Button */}
//                     <Link
//                       to="/app/chat"
//                       // onClick={() =>
//                       //   alert(`Starting chat with ${item.friend.fullname}`)
//                       // }
//                       className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
//                       title="Send Message">
//                       <i className="ri-chat-3-line text-base"></i>
//                     </Link>

//                     {/* Audio Call Trigger Button */}
//                     <Link
//                       to="/app/audio"
//                       // onClick={() => alert(`Calling ${item.friend.fullname}`)}
//                       className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
//                       title="Audio Call">
//                       <i className="ri-phone-line text-base"></i>
//                     </Link>

//                     {/* Video Call Trigger Button */}
//                     <Link
//                       to="/app/video"
//                       // onClick={() =>
//                       //   alert(
//                       //     `Starting video call with ${item.friend.fullname}`,
//                       //   )
//                       // }
//                       className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
//                       title="Video Call">
//                       <i className="ri-vidicon-line text-base"></i>
//                     </Link>
//                   </div>
//                 )}

//                 {/* PRIMARY SYSTEM ACTIONS CTAS */}
//                 {item.status === "accepted" ? (
//                   <Button
//                     type="danger"
//                     icon="user-minus-line"
//                     className="w-full text-xs py-2 rounded-xl justify-center font-semibold bg-rose-500/50 hover:bg-rose-500 hover:text-white text-rose-500 border border-rose-100 shadow-none hover:scale-100"
//                     onClick={() => unfriend(item._id)}>
//                     Unfriend
//                   </Button>
//                 ) : (
//                   <Button
//                     type="info"
//                     icon="check-double-line"
//                     className="w-full text-xs py-2.5 rounded-xl justify-center font-semibold bg-gray-500/50 hover:bg-gray-500 hover:text-white text-gray-600 border border-gray-100 shadow-none hover:scale-100 capitalize mt-2"
//                     onClick={() =>
//                       alert(`Current Request status: ${item.status}`)
//                     }>
//                     {item.status}
//                   </Button>
//                 )}
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Friends;

import Card from "../../shared/Card";
import Button from "../../shared/Button";
import useSWR from "swr";
import Fetcher from "../../../lib/Fetcher";
import Loader from "../../shared/Loader";
import NotFound from "../../shared/NotFound";
import HttpInterceptor from "../../../lib/HttpInterceptor";
import { Link } from "react-router-dom";

interface FriendDataInterface {
  id?: string;
  fullname?: string | null;
  email?: string;
  image?: string | null;
}
interface FriendInterface {
  _id: string;
  id: string;
  status: string;
  friend: FriendDataInterface;
}

const Friends = () => {
  const {
    data: friendsList,
    isLoading,
    error,
    mutate,
  } = useSWR<FriendInterface[]>("/friend", Fetcher);

  if (isLoading) return <Loader />;
  if (error || !friendsList) return <NotFound />;

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`);
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Connections ({friendsList.length})
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {friendsList.map((item: FriendInterface) => {
          const initials =
            item.friend.fullname
              ?.trim()
              .split(/\s+/)
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()
              .slice(0, 2) || "??";
          return (
            <Card
              key={item._id}
              className="hover:shadow-md transition-shadow border border-gray-100 bg-white">
              <div className="flex flex-col items-center text-center p-2">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm mb-3">
                  {item.friend.image ? (
                    <img
                      src={item.friend.image}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <h3 className="text-sm font-bold text-gray-800 capitalize truncate w-full mb-0.5">
                  {item.friend.fullname || "User Profile"}
                </h3>
                <p className="text-xs text-gray-400 truncate w-full mb-4">
                  {item.friend.email}
                </p>

                {item.status === "accepted" && (
                  <div className="flex items-center gap-2 mb-4 w-full justify-center">
                    <Link
                      to={`/app/chat/${item.friend.id}`}
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Chat">
                      <i className="ri-chat-3-line text-base"></i>
                    </Link>
                    <Link
                      to="/app/audio"
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Voice Call">
                      <i className="ri-phone-line text-base"></i>
                    </Link>
                    <Link
                      to="/app/video"
                      className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 flex items-center justify-center transition-all border border-gray-100"
                      title="Video Call">
                      <i className="ri-vidicon-line text-base"></i>
                    </Link>
                  </div>
                )}

                {item.status === "accepted" ? (
                  <Button
                    type="danger"
                    icon="user-minus-line"
                    className="w-full text-xs py-2 rounded-xl justify-center font-bold shadow-none border border-rose-100 transition-all h-9"
                    onClick={() => unfriend(item._id)}>
                    Unfriend
                  </Button>
                ) : (
                  <div className="w-full text-center text-xs font-bold text-gray-400 py-2 bg-gray-50 border border-gray-100 rounded-xl capitalize">
                    {item.status}
                  </div>
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
