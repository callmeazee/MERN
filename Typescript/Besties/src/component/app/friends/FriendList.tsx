// import { Link } from "react-router-dom";
// import Avatar from "../../shared/Avatar";

// const FriendList = () => {
//   return (
//     <div className="flex-1 min-h-0 flex flex-col p-4">
//       <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 shrink-0">
//         My Friends
//       </h2>

//       <div className="flex-1 overflow-y-auto space-y-4 pr-1">
//         {Array(20)
//           .fill(0)
//           .map((_, idx) => (
//             <div
//               key={idx}
//               className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
//               <Avatar
//                 size="md"
//                 image="/images/man1.png"
//                 title="John adams"
//                 subtitle={
//                   <small
//                     className={
//                       idx % 2 === 0
//                         ? "text-green-500 font-medium"
//                         : "text-zinc-400"
//                     }>
//                     {idx % 2 === 0 ? "• Online" : "Offline"}
//                   </small>
//                 }
//               />

//               <div className="flex items-center gap-3">
//                 <Link to="/app/chat">
//                   <button
//                     className="p-1 cursor-pointer transition-transform hover:scale-110"
//                     title="chat">
//                     <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
//                   </button>
//                 </Link>
//                 <Link to="/app/audio">
//                   <button
//                     className="p-1 cursor-pointer transition-transform hover:scale-110"
//                     title="audio call">
//                     <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
//                   </button>
//                 </Link>
//                 <Link to="/app/video">
//                   <button
//                     className="p-1 cursor-pointer transition-transform hover:scale-110"
//                     title="video call">
//                     <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default FriendList;

import { Link } from "react-router-dom";
import Avatar from "../../shared/Avatar";

const FriendList = () => {
  return (
    <div className="flex flex-col bg-white p-3 flex-1 min-h-0">
      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">
        My Friends List
      </h2>

      <div className="space-y-1 overflow-y-auto max-h-96 pr-1">
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <div
              key={idx}
              className="p-2 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="min-w-0 flex-1">
                <Avatar
                  size="md"
                  image="/images/man1.png"
                  title="John adams"
                  subtitle={
                    <span
                      className={`text-[11px] font-medium ${idx % 2 === 0 ? "text-green-500" : "text-gray-400"}`}>
                      {idx % 2 === 0 ? "Active now" : "Offline"}
                    </span>
                  }
                />
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to="/app/chat"
                  className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors">
                  <i className="ri-chat-3-line text-sm"></i>
                </Link>
                <Link
                  to="/app/video"
                  className="inline-flex items-center justify-center w-8 h-8 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                  <i className="ri-video-on-line text-sm"></i>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
