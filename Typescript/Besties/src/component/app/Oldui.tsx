// {/* <aside
//   className="bg-white p-4 lg:p-8 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100
//                    w-full lg:fixed lg:top-0 lg:right-0 lg:h-full"
//   style={
//     {
//       width: "100%",
//       maxWidth: "var(--right-max-w, 100%)",
//       "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//       // Enforces hard structural limits cleanly on zoom
//     } as React.CSSProperties
//   }>
//   <Card title="my friends" divider>
//     <div className="space-y-4 max-h-125 lg:max-h-none overflow-y-auto pr-1">
//       {Array(20)
//         .fill(0)
//         .map((_, idx) => (
//           <div
//             key={idx}
//             className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
//             <Avatar
//               size="md"
//               image="/images/man1.png"
//               title="John adams"
//               subtitle={
//                 <small
//                   className={
//                     idx % 2 === 0
//                       ? "text-green-500 font-medium"
//                       : "text-zinc-400"
//                   }>
//                   {idx % 2 === 0 ? "• Online" : "Offline"}
//                 </small>
//               }
//             />

//             {/* Action Row Fixed Order: Message -> Audio -> Video */}
//             <div className="flex items-center gap-3">
//               <Link to="/app/chat">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="chat">
//                   <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
//                 </button>
//               </Link>
//               <Link to="/app/audio">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="audio call">
//                   <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
//                 </button>
//               </Link>
//               <Link to="/app/video">
//                 <button
//                   className="p-1 cursor-pointer transition-transform hover:scale-110"
//                   title="video call">
//                   <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ))}
//     </div>
//   </Card>
// </aside>; */}

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

export default Video 
*/

// import Button from "../shared/Button";

// const Video = () => {
//   return (
//     <div className="space-y-6 md:space-y-8">
//       {/* MAIN VIDEO TRACK CONTAINER */}
//       <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl shadow-inner overflow-hidden">
//         <video className="w-full h-full absolute top-0 left-0 object-cover"></video>

//         {/* Username Label */}
//         <button className="absolute bottom-4 left-4 text-xs px-2.5 py-1 rounded-lg text-white bg-black/40 backdrop-blur-md">
//           Rahul Kumar (You)
//         </button>

//         {/* Controls Overlay */}
//         <button className="absolute bottom-4 right-4 text-xs p-2 rounded-lg text-white transition-all duration-200 hover:bg-white/20 bg-black/40 backdrop-blur-md active:scale-95">
//           <i className="ri-fullscreen-line text-sm"></i>
//         </button>
//       </div>

//       {/* SECONDARY PARTICIPANTS GRID */}
//       {/* Mobile: 1 column | Desktop: 3 columns */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {/* Participant Item 1 */}
//         <div className="bg-black w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden shadow">
//           <video className="w-full h-full absolute top-0 left-0 object-cover"></video>
//           <button className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-md text-white bg-black/50 backdrop-blur-sm">
//             Rahul Kumar
//           </button>
//         </div>

//         {/* Participant Item 2 Placeholder */}
//         <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
//           <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
//             <span>Camera Off</span>
//           </div>
//         </div>

//         {/* Participant Item 3 Placeholder */}
//         <div className="bg-zinc-800 w-full h-0 relative pb-[56.25%] rounded-xl overflow-hidden flex items-center justify-center">
//           <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">
//             <span>Camera Off</span>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM CONTROL MEDIA ACTION ROW */}
//       {/* Mobile: Wraps to layout naturally | Desktop: Spread row split */}
//       <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
//         {/* Toggle Panel Buttons */}
//         <div className="flex items-center gap-3">
//           {/* Camera Button */}
//           <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
//             <i className="ri-vidicon-line text-xl"></i>
//           </button>

//           {/* Microphone Button */}
//           <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
//             <i className="ri-mic-line text-xl"></i>
//           </button>

//           {/* Screen Share Button */}
//           <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
//             <i className="ri-computer-line text-xl"></i>
//           </button>
//         </div>

//         {/* End Call Action Button */}
//         <div className="w-full sm:w-auto">
//           <Button
//             icon="close-circle-fill"
//             type="danger"
//           >
//             End Call
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;

/* 

      // BOTTOM CONTROL MEDIA ACTION ROW 
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        // Toggle Panel Buttons 
        <div className="flex items-center gap-3">
          // Camera Button 
          <button className="bg-emerald-500 text-white w-12 h-12 rounded-full hover:bg-emerald-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-emerald-100">
            <i className="ri-vidicon-line text-xl"></i>
          </button>

          // Microphone Button 
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

          //Screen Share Button 
          <button className="bg-blue-500 text-white w-12 h-12 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-blue-100">
            <i className="ri-computer-line text-xl"></i>
          </button>
        </div>

        // End Call Action Button 
        <div className="w-full sm:w-auto">
          <Button
            icon="close-circle-fill"
            type="danger"
         >
            End Call
          </Button>
        </div>
      </div>

*/

/* import Button from "../shared/Button";


import Card from "../shared/Card";

const Audio = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Azee khan">
          <div className="flex flex-col items-center">
            <img
              src=""
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>
        <Card title="Azee khan">
          <div className="flex flex-col items-center">
            <img
              src=""
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </Card>
      </div>

    
 
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
       
        <div className="flex items-center gap-3">
       
         

       
          <button className="bg-amber-500 text-white w-12 h-12 rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center cursor-pointer active:scale-95 shadow-md shadow-amber-100">
            <i className="ri-mic-line text-xl"></i>
          </button>

       
    
        </div>

    
        <div className="w-full sm:w-auto">
          <Button icon="close-circle-fill" type="danger">
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Audio; */

/* import Card from "../shared/Card"


const Friends = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {Array(20)
        .fill(0)
        .map((item, idx) => (
          <Card key={idx}>
            <div className="flex flex-col items-center gap-3">
              <img src="/images/coding.png" />
              <h1 className="text-base font-medium text-black">John alex</h1>
              <button className="bg-indigo-400 text-white rounded px-2 py-1 text-xs hover:bg-indigo-500 mt-1 font-medium">
                <i className="ri-user-minus-line mr-1"></i>
                Unfriend
              </button>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default Friends */

/* 
import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/divider"
import IconButton from "../shared/IconButton"


const Post = () => {
  return (
    <div className="space-y-8">
      {
        Array(20).fill(0).map((item, idx) => (
          <Card key={idx}>
            <div className="space-y-3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio excepturi, ex perspiciatis magnam totam similique incidunt quasi quo voluptas odit distinctio aut nostrum, id eos, repudiandae corrupti aliquam blanditiis.
              </p>
              <div className="flex justify-between items-center">
                <label className="text-sm font-normal">Jan 2, 2030 7:00pm</label>
                <div className="flex gap-4">
                  <IconButton type= 'info' icon="edit-line"/>
                  <IconButton type= 'danger' icon="delete-bin-4-line"/>

                </div>

              </div>
              <Divider />
              <div className="space-x-4">
               <Button icon="thumb-up-line" type="info">20k</Button>
               <Button icon="thumb-down-line" type="warning">2k</Button>
               <Button icon="chat-ai-line" type="info">1.5k</Button>

              </div>

            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Post


*/

/* 

*/

/* 

// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Avatar from "../shared/Avatar";
// import Card from "../shared/Card";
// import { useContext, useState } from "react";
// import type { CSSProperties } from "react";
// import Context from "../../Context";
// import HttpInterceptor from "../../lib/HttpInterceptor";
// import { v4 as uuid } from "uuid";
// import useSWR, { mutate } from "swr";
// import Fetcher from "../../lib/Fetcher";
// import CatchError from "../../lib/CatchError";

// const eightMinutesInMillisecond = 8 * 60 * 1000;

// const Layout = () => {
//   const [leftAsideSize, setLeftAsideSize] = useState(350);
//   const rightAsideSize = 450;
//   const collapseSize = 130;

//   useSWR("/auth/refresh-token", Fetcher, {
//     //our token exoires in 10 mi9nutes so 2 minutes before we have to refresh it
//     refreshInterval: eightMinutesInMillisecond,
//     shouldRetryOnError: false,
//   });

//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { session, setSession } = useContext(Context);

//   const menus = [
//     {
//       href: "/app/dashboard",
//       label: "dashboard",
//       icon: "ri-home-4-line",
//     },
//     {
//       href: "/app/posts",
//       label: "my posts",
//       icon: "ri-article-line",
//     },
//     {
//       href: "/app/friends",
//       label: "friends",
//       icon: "ri-team-line",
//     },
//   ];

//   const getPathName = (path: string) => {
//     const firstPath = path.split("/").pop();
//     const secondPath = firstPath?.split("-").join(" ");
//     return secondPath;
//   };

//   const uploadImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.click();
//     input.onchange = async () => {
//       if (!input.files) return;

//       const file = input.files[0];
//       const path = `profile-picture/${uuid()}.png`;
//       const payload = {
//         path: path,
//         type: file.type,
//       };

//       try {
//         const options = {
//           headers: {
//             "Content-Type": file.type,
//           },
//         };
//         const { data } = await HttpInterceptor.post("/storage/upload", payload);
//         console.log(data);
//         await HttpInterceptor.put(data.url, file, options);
//         const { data: user } = await HttpInterceptor.put(
//           "/auth/profile-picture",
//           { path: path },
//         );
//         setSession({ ...session, image: user.image });
//         mutate("/auth/refresh-token");
//       } catch (err) {
//         console.log(err);
//       }
//     };
//   };

//   const logout = async () => {
//     try {
//       await HttpInterceptor.post("/auth/logout");
//       navigate("/login");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
//       {/* LEFT NAVIGATION DRAWER */
//       {/* Mobile: Bottom Fixed Bar | Desktop: Fixed Left Sidebar with state width changes */}
//       <aside
//         className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
//                    lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
//         style={
//           {
//             width: "var(--left-width, 100%)",
//             transition: "width 0.2s ease-in-out",
//             "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`, // Flips gracefully using pure CSS rules on desktop layouts
//           } as React.CSSProperties
//         }>
//         {/* We use a Tailwind override to break standard mobile dimensions on desktop viewports */}
//         <div
//           className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
//             leftAsideSize === collapseSize ? "lg:items-center" : ""
//           } transition-all duration-500 ease-in-out`}
//           style={{
//             background:
//               "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
//           }}>
//           {/* User Profile */}
//           <div className="hidden lg:block animate__animated animate__fadeIn">
//             {session && (
//               <Avatar
//                 title={leftAsideSize === collapseSize ? null : session.fullname}
//                 size={leftAsideSize === collapseSize ? "md" : "lg"}
//                 subtitle={session.email}
//                 titleColor="white"
//                 subtitleColor="#ddd"
//                 image={session.image || "/images/woman.png"}
//                 onClick={uploadImage}
//               />
//             )}
//           </div>

//           <div className="hidden lg:block border-b border-white/10 pt-2 mt-5 -mx-4" />

//           {/* Navigation Links */}
//           <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-2 flex-1 lg:pt-2 lg:mt-6 w-full">
//             {menus.map((item, idx) => (
//               <Link
//                 title={item.label}
//                 to={item.href}
//                 key={idx}
//                 className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-1.5 lg:px-3.5 lg:py-2.5 rounded-xl text-[#b8aadf] text-xs lg:text-sm font-medium
//                            transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]">
//                 <i className={`${item.icon} text-lg lg:text-xl`}></i>
//                 <span
//                   className={`capitalize ${leftAsideSize === collapseSize ? "lg:hidden" : ""}`}>
//                   {item.label}
//                 </span>
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:block border-t border-white/10 pt-2">
//             <button
//               onClick={logout}
//               title="logout"
//               className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
//                         text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
//                         hover:bg-red-500/15 hover:text-red-300 mt-3">
//               <i className="ri-logout-box-r-line text-xl"></i>
//               <span
//                 className={leftAsideSize === collapseSize ? "lg:hidden" : ""}>
//                 Logout
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       {/* Uses pure CSS calc properties to dynamically subtract spacing parameters without layout shifts */}
//       <main
//         className="flex-1 rounded-2xl py-6 px-4 mb-20 lg:mb-0 lg:py-8 lg:px-6 w-full"
//         style={
//           {
//             width: "100%",
//             marginLeft: "var(--main-ml, 0px)",
//             marginRight: "var(--main-mr, 0px)",
//             transition: "margin 0.3s ease-in-out",
//             // Real-time CSS calc values targeting desktop boundaries natively
//             "--main-ml": `calc(0px + ${leftAsideSize}px)`,
//             "--main-mr": `calc(0px + ${rightAsideSize}px)`,
//           } as CSSProperties
//         }>
//         <Card
//           title={
//             <div className="flex gap-6 items-center">
//               <button
//                 className="hidden lg:block bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200 cursor-pointer"
//                 onClick={() =>
//                   setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
//                 }>
//                 <i
//                   className={
//                     leftAsideSize === collapseSize
//                       ? "ri-arrow-right-line"
//                       : "ri-arrow-left-line"
//                   }></i>
//               </button>
//               <h1 className="text-xl font-bold text-slate-800 lg:text-2xl">
//                 {getPathName(pathname)}
//               </h1>
//             </div>
//           }>
//           <Outlet />
//         </Card>
//       </main>

//       {/* RIGHT FRIENDS DRAWER */}
//       {/* Mobile: Bottom linear stack | Desktop: Hard-locked right edge panel using safe width specifications */}
//       <aside
//         className="p-4 lg:p-6 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:fixed lg:top-0 lg:right-0 lg:h-full z-40"
//         style={
//           {
//             width: "100%",
//             maxWidth: "var(--right-max-w, 100%)",
//             "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
//           } as React.CSSProperties
//         }>
//         <Card className="h-full" noPadding>
//           <div className="flex flex-col h-full divide-y divide-gray-100">
//             {/* 1. SUGGESTED FRIENDS SECTION (TOP) */}
//             <div className="p-4 shrink-0">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
//                   Suggested Friends
//                 </h2>
//                 <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
//                   See All
//                 </button>
//               </div>

//               {/* Horizontal Scrollable Row for Suggestions */}
//               <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x">
//                 {Array(15)
//                   .fill(0)
//                   .map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center min-w-27.5 snap-start hover:shadow-sm transition-shadow">
//                       {/* Compact Avatar Fallback */}
//                       <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-2 shadow-sm">
//                         SF
//                       </div>
//                       <h4 className="text-xs font-bold text-slate-700 truncate w-full max-w-22.5">
//                         Alex Rivera
//                       </h4>
//                       <p className="text-[10px] text-slate-400 mb-2 truncate w-full max-w-22.5">
//                         Mutual Friend
//                       </p>
//                       {/* Quick Add Button */}
//                       <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors w-full cursor-pointer flex items-center justify-center gap-1">
//                         <i className="ri-user-add-line"></i> Add
//                       </button>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* 2. MY FRIENDS LIST SECTION (BOTTOM) */}
//             {/* flex-1 min-h-0 and flex flex-col allows the main list to take up all remaining height perfectly */}
//             <div className="flex-1 min-h-0 flex flex-col p-4">
//               <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 shrink-0">
//                 My Friends
//               </h2>

//               {/* Scrollable list frame */}
//               <div className="flex-1 overflow-y-auto space-y-4 pr-1">
//                 {Array(20)
//                   .fill(0)
//                   .map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="p-3 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100/70 transition-colors">
//                       <Avatar
//                         size="md"
//                         image="/images/man1.png"
//                         title="John adams"
//                         subtitle={
//                           <small
//                             className={
//                               idx % 2 === 0
//                                 ? "text-green-500 font-medium"
//                                 : "text-zinc-400"
//                             }>
//                             {idx % 2 === 0 ? "• Online" : "Offline"}
//                           </small>
//                         }
//                       />

//                       {/* Action Row Fixed Order: Message -> Audio -> Video */}
//                       <div className="flex items-center gap-3">
//                         <Link to="/app/chat">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="chat">
//                             <i className="ri-chat-3-line text-xl text-blue-500 hover:text-blue-600"></i>
//                           </button>
//                         </Link>
//                         <Link to="/app/audio">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="audio call">
//                             <i className="ri-phone-line text-xl text-indigo-500 hover:text-indigo-600"></i>
//                           </button>
//                         </Link>
//                         <Link to="/app/video">
//                           <button
//                             className="p-1 cursor-pointer transition-transform hover:scale-110"
//                             title="video call">
//                             <i className="ri-video-on-line text-xl text-emerald-500 hover:text-emerald-600"></i>
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </Card>
//       </aside>

//       {/* Embedded CSS Breakpoint overrides so standard styles behave flawlessly on browser zoom events */}
//       <style>{`
//         @media (max-width: 1023px) {
//           aside, main {
//             margin-left: 0px !important;
//             margin-right: 0px !important;
//             width: 100% !important;
//             max-width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Layout;

/* 

import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import { Empty, Skeleton } from "antd";
import NotFound from "../shared/NotFound";
import Button from "../shared/Button";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

// Expanded to track exactly WHICH action is loading per index row
interface LoadingInterface {
  state: boolean;
  index: null | number;
  action: "accept" | "reject" | null;
}

// Strongly-typed friend request item
interface FriendRequestItem {
  _id: string;
  user?: {
    fullname?: string;
    image?: string;
  } | null;
  createdAt: string;
}

const FriendRequests = () => {
  const [loading, setLoading] = useState<LoadingInterface>({
    state: false,
    index: null,
    action: null,
  });

  // Fetching data from your incoming friend requests route
  const { data, error, isLoading } = useSWR("/friend/request", Fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  if (error)
    return (
      <div>
        <NotFound />
      </div>
    );
  if (isLoading || !data)
    return (
      <div className="p-4 space-y-3">
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    );
  if (data.length === 0)
    return (
      <div className="p-6">
        <Empty description="No pending friend requests" />
      </div>
    );

  // Unified Request Handler
  const handleRequestAction = async (
    requestId: string,
    index: number,
    action: "accept" | "reject",
  ) => {
    try {
      setLoading({ state: true, index, action });

      // Hit your backend endpoint (adjust paths matching your controller routers structure)
      await HttpInterceptor.put(`/friend/request/${requestId}`, {
        status: action,
      });

      toast.success(`Request ${action}ed successfully!`, {
        position: "top-center",
      });

      // Global mutations to sync UI states instantly
      mutate("/friend/request");
      mutate("/friend"); // Revalidates active connections tab
    } catch (err) {
      CatchError(err);
    } finally {
      setLoading({ state: false, index: null, action: null });
    }
  };

  return (
    <div className="p-4 w-full max-w-2xl mx-auto">
      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
        Friend Requests
      </h2>
      {/* HEADER SECTION */
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
//           Pending Requests ({data.length})
//         </h2>
//       </div>

//       {/* RESPONSIVE VERTICAL SCROLL CONTAINER */}
//       <div className="flex flex-col gap-3 max-h-125 overflow-y-auto pr-1 pb-2 custom-scrollbar">
//         {data &&
//           data.map((item: FriendRequestItem, idx: number) => {
//             // Fallback Initials Generation logic safely protected
//             const initials = item.user?.fullname
//               ? item.user.fullname
//                   .trim()
//                   .split(/\s+/)
//                   .map((w: string) => w[0])
//                   .join("")
//                   .toUpperCase()
//                   .slice(0, 2)
//               : "??";

//             return (
//               <div
//                 key={item._id || idx}
//                 className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 hover:shadow-sm transition-shadow duration-200">
//                 {/* LEFT PROFILE & BLOCK INFO */}
//                 <div className="flex items-center gap-3 w-full sm:w-auto">
//                   <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
//                     {item.user?.image ? (
//                       <img
//                         src={item.user.image}
//                         alt={item.user.fullname}
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     ) : (
//                       initials
//                     )}
//                   </div>

//                   <div className="truncate">
//                     <h4 className="text-sm font-bold text-slate-700 capitalize truncate">
//                       {item.user?.fullname || "Anonymous User"}
//                     </h4>
//                     <p className="text-[11px] text-slate-400">
//                       {`Received ${moment(item.createdAt).fromNow()}`}
//                     </p>
//                   </div>
//                 </div>

//                 {/* RIGHT ROW: ACTIONS PANEL (Full width on mobile layout seamlessly) */}
//                 <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
//                   {/* REJECT BUTTON */}
//                   <Button
//                     className="bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex-1 sm:flex-none justify-center"
//                     icon="close-line"
//                     loading={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "reject"
//                     }
//                     disabled={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "accept"
//                     }
//                     onClick={() =>
//                       handleRequestAction(item._id, idx, "reject")
//                     }>
//                     Reject
//                   </Button>

//                   {/* ACCEPT BUTTON */}
//                   <Button
//                     className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors flex-1 sm:flex-none justify-center"
//                     icon="user-check-line"
//                     loading={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "accept"
//                     }
//                     disabled={
//                       loading.state &&
//                       loading.index === idx &&
//                       loading.action === "reject"
//                     }
//                     onClick={() =>
//                       handleRequestAction(item._id, idx, "accept")
//                     }>
//                     Accept
//                   </Button>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default FriendRequests;
