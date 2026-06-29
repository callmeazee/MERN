// import { useState, useContext, useEffect } from "react";
// import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
// import useSWR, { mutate } from "swr";
// import axios from "axios";
// import { v4 as uuid } from "uuid";
// import Context from "../../Context";
// import Fetcher from "../../lib/Fetcher";
// import CatchError from "../../lib/CatchError";
// import HttpInterceptor from "../../lib/HttpInterceptor";

// import DesktopLayout from "../responsiveLayout/DesktopLayout";
// import MobileLayout from "../responsiveLayout/MobileLayout";
// import Avatar from "../shared/Avatar";
// import socket from "../../lib/socket";
// import type { OnOfferInterface } from "./Video";

// const eightMinutesInMillisecond = 8 * 60 * 1000;

// const Layout = () => {
//   const params = useParams();
//   const paramsArray = Object.keys(params);
//   const { liveActiveSession, setLiveActiveSession, setSdp } =
//     useContext(Context);
//   const [leftAsideSize, setLeftAsideSize] = useState(350);
//   const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
//   const [mobileActiveTab, setMobileActiveTab] = useState<
//     "workspace" | "discover"
//   >("workspace");
//   const [activeRightTab, setActiveRightTab] = useState<"activity" | "explore">(
//     "activity",
//   );
//   const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

//   const rightAsideSize = 420;
//   const collapseSize = 75;

//   const { error } = useSWR("/auth/refresh-token", Fetcher, {
//     refreshInterval: eightMinutesInMillisecond,
//     shouldRetryOnError: false,
//   });

//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { session, setSession } = useContext(Context);

//   // Check if the current route is a communication view that requires a full screen override on mobile
//   const isCommunicationView =
//     pathname.includes("/app/chat") ||
//     pathname.includes("/app/video") ||
//     pathname.includes("/app/audio");

//   const menus = [
//     { href: "/app/dashboard", label: "dashboard", icon: "ri-home-4-line" },
//     { href: "/app/posts", label: "my posts", icon: "ri-article-line" },
//     { href: "/app/friends", label: "friends", icon: "ri-team-line" },
//   ];

//   const getPathName = (path: string) => {
//     const firstPath = path.split("/").pop();
//     return firstPath?.split("-").join(" ") || "";
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
//       const payload = { path, type: file.type, status: "public-read" };

//       try {
//         const options = { headers: { "Content-Type": file.type } };
//         const { data } = await HttpInterceptor.post("/storage/upload", payload);
//         await axios.put(data.url, file, options);
//         const { data: user } = await HttpInterceptor.put(
//           "/auth/profile-picture",
//           { path },
//         );
//         setSession({ ...session, image: user.image });
//         mutate("/auth/refresh-token");
//       } catch (err) {
//         console.error(err);
//       }
//     };
//   };

//   const logout = async () => {
//     try {
//       await HttpInterceptor.post("/auth/logout");
//       setSession(null);
//       navigate("/login");
//     } catch (err) {
//       CatchError(err);
//     }
//   };

//   const onOffer = (payload: OnOfferInterface) => {
//     setSdp(payload);
//     setLiveActiveSession(payload.from);
//     if(payload.type === 'video')
//      return navigate(`/app/video/${payload.from.socketId}`);
//     if (payload.type === 'audio')
//       return navigate(`/app/audio/${payload.from.socketId}`)
//       if (payload.type === "chat")
//         return navigate(`/app/chat/${payload.from.socketId}`);
//   };

//   useEffect(() => {
//     socket.on("offer", onOffer);
//     return () => {
//       socket.off("offer", onOffer);
//     };
//   }, []);

//   useEffect(() => {
//     if (error) logout();
//   }, [error]);

//   const ActiveSessionUi = () => {
//     if (!liveActiveSession) {
//       navigate("/app");
//       return;
//     }
//     return (
//       <div>
//         <Avatar
//           image={liveActiveSession.image ? liveActiveSession.image : "null"}
//           title={liveActiveSession.fullname}
//           subtitle="online"
//         />
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-600">
//       {/* DESKTOP ENGINE FLOW */}
//       {isCommunicationView ? (
//         /* 🚀 Communication Full Screen Override View Mode
//             If a user is inside a chat conversation or a call, we drop standard tab navigation hulls
//             to let the chat box or video track take 100% viewport width and height.
//           */
//         <div className=" hidden lg:flex w-full flex-1  flex-col min-h-0 bg-white">
//           {/* Top Navigation Backbar for Full-Screen Mode */}
//           <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
//             <button
//               onClick={() => navigate("/app/dashboard")}
//               className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
//               <i className="ri-arrow-left-line text-lg"></i>
//             </button>
//             <span className="text-sm font-bold text-slate-800 uppercase tracking-wide ">
//               {paramsArray.length > 0 ? (
//                 // eslint-disable-next-line react-hooks/static-components
//                 <ActiveSessionUi />
//               ) : (
//                 getPathName(pathname)
//               )}
//             </span>
//           </div>

//           {/* Active Sub-route Content Container */}
//           <div className="flex-1 overflow-hidden">
//             <Outlet />
//           </div>
//         </div>
//       ) : (
//         <div className="hidden lg:block">
//           <DesktopLayout
//             leftAsideSize={leftAsideSize}
//             setLeftAsideSize={setLeftAsideSize}
//             rightAsideSize={rightAsideSize}
//             collapseSize={collapseSize}
//             pathname={pathname}
//             menus={menus}
//             session={session}
//             getPathName={getPathName}
//             uploadImage={uploadImage}
//             logout={logout}
//             activeRightTab={activeRightTab}
//             setActiveRightTab={setActiveRightTab}
//           />
//         </div>
//       )}

//       {/* MOBILE ENGINE FLOW */}
//       <div className=" lg:hidden flex-1 flex flex-col min-h-0">
//         {isCommunicationView ? (
//           /* 🚀 Communication Full Screen Override View Mode
//             If a user is inside a chat conversation or a call, we drop standard tab navigation hulls
//             to let the chat box or video track take 100% viewport width and height.
//           */
//           <div className="w-full flex-1 flex flex-col min-h-0 bg-white">
//             {/* Top Navigation Backbar for Full-Screen Mode */}
//             <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
//               <button
//                 onClick={() => navigate("/app/dashboard")}
//                 className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
//                 <i className="ri-arrow-left-line text-lg"></i>
//               </button>
//               <span className="text-sm font-bold text-slate-800 uppercase tracking-wide ">
//                 {paramsArray.length > 0 ? (
//                   // eslint-disable-next-line react-hooks/static-components
//                   <ActiveSessionUi />
//                 ) : (
//                   getPathName(pathname)
//                 )}
//               </span>
//             </div>

//             {/* Active Sub-route Content Container */}
//             <div className="flex-1 overflow-hidden">
//               <Outlet />
//             </div>
//           </div>
//         ) : (
//           /* Standard Shell Views (Dashboard, Friends list, Post feeds) */
//           <MobileLayout
//             pathname={pathname}
//             menus={menus}
//             session={session}
//             getPathName={getPathName}
//             uploadImage={uploadImage}
//             logout={logout}
//             isMobileProfileOpen={isMobileProfileOpen}
//             setIsMobileProfileOpen={setIsMobileProfileOpen}
//             mobileActiveTab={mobileActiveTab}
//             setMobileActiveTab={setMobileActiveTab}
//             isEditProfileModalOpen={isEditProfileModalOpen}
//             setIsEditProfileModalOpen={setIsEditProfileModalOpen}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Layout;

import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, Outlet, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { v4 as uuid } from "uuid";

import Context from "../../Context";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";

import DesktopLayout from "../responsiveLayout/DesktopLayout";
import MobileLayout from "../responsiveLayout/MobileLayout";

const eightMinutesInMillisecond = 8 * 60 * 1000;

const Layout = () => {
  const params = useParams();
  const paramsArray = Object.keys(params);

  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const [mobileActiveTab, setMobileActiveTab] = useState<
    "workspace" | "discover"
  >("workspace");

  const [activeRightTab, setActiveRightTab] = useState<"activity" | "explore">(
    "activity",
  );

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const rightAsideSize = 420;
  const collapseSize = 75;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { session, setSession } = useContext(Context);

  const isCommunicationView =
    pathname.includes("/app/chat") ||
    pathname.includes("/app/video") ||
    pathname.includes("/app/audio");

  const menus = [
    {
      href: "/app/dashboard",
      label: "dashboard",
      icon: "ri-home-4-line",
    },
    {
      href: "/app/posts",
      label: "my posts",
      icon: "ri-article-line",
    },
    {
      href: "/app/friends",
      label: "friends",
      icon: "ri-team-line",
    },
  ];

  const getPathName = (path: string) => {
    const firstPath = path.split("/").pop();

    return firstPath?.split("-").join(" ") || "";
  };

  const uploadImage = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = async () => {
      if (!input.files) return;

      const file = input.files[0];

      const path = `profile-picture/${uuid()}.png`;

      const payload = {
        path,
        type: file.type,
        status: "public-read",
      };

      try {
        const options = {
          headers: {
            "Content-Type": file.type,
          },
        };

        const { data } = await HttpInterceptor.post("/storage/upload", payload);

        await axios.put(data.url, file, options);

        const { data: user } = await HttpInterceptor.put(
          "/auth/profile-picture",
          {
            path,
          },
        );

        setSession({
          ...session,
          image: user.image,
        });

        mutate("/auth/refresh-token");
      } catch (err) {
        CatchError(err);
      }
    };
  };

  const logout = async () => {
    try {
      await HttpInterceptor.post("/auth/logout");

      setSession(null);

      navigate("/login");
    } catch (err) {
      CatchError(err);
    }
  };

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-600">
      {isCommunicationView ? (
        <div className="hidden lg:flex w-full flex-1 flex-col min-h-0 bg-white">
          <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
            <button
              onClick={() => navigate("/app/dashboard")}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
              <i className="ri-arrow-left-line text-lg" />
            </button>

            <span className="text-sm font-bold uppercase tracking-wide text-slate-800">
              {paramsArray.length > 0
                ? "Live Communication"
                : getPathName(pathname)}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="hidden lg:block">
          <DesktopLayout
            leftAsideSize={leftAsideSize}
            setLeftAsideSize={setLeftAsideSize}
            rightAsideSize={rightAsideSize}
            collapseSize={collapseSize}
            pathname={pathname}
            menus={menus}
            session={session}
            getPathName={getPathName}
            uploadImage={uploadImage}
            logout={logout}
            activeRightTab={activeRightTab}
            setActiveRightTab={setActiveRightTab}
          />
        </div>
      )}

      <div className="lg:hidden flex-1 flex flex-col min-h-0">
        {isCommunicationView ? (
          <div className="w-full flex-1 flex flex-col min-h-0 bg-white">
            <div className="h-14 border-b border-slate-100 flex items-center px-4 gap-3 shrink-0 bg-slate-50">
              <button
                onClick={() => navigate("/app/dashboard")}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-700 active:scale-95 transition-transform">
                <i className="ri-arrow-left-line text-lg" />
              </button>

              <span className="text-sm font-bold uppercase tracking-wide text-slate-800">
                {paramsArray.length > 0
                  ? "Live Communication"
                  : getPathName(pathname)}
              </span>
            </div>

            <div className="flex-1 overflow-hidden">
              <Outlet />
            </div>
          </div>
        ) : (
          <MobileLayout
            pathname={pathname}
            menus={menus}
            session={session}
            getPathName={getPathName}
            uploadImage={uploadImage}
            logout={logout}
            isMobileProfileOpen={isMobileProfileOpen}
            setIsMobileProfileOpen={setIsMobileProfileOpen}
            mobileActiveTab={mobileActiveTab}
            setMobileActiveTab={setMobileActiveTab}
            isEditProfileModalOpen={isEditProfileModalOpen}
            setIsEditProfileModalOpen={setIsEditProfileModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;