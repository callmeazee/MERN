<<<<<<< HEAD
/* import { Link, Outlet, useLocation } from "react-router-dom";

=======
import { Link, Outlet, useLocation } from "react-router-dom";
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useState } from "react";

const Layout = () => {
<<<<<<< HEAD
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const rightAsideSize = 450;
  const collapseSize = 120;

=======

  const [leftAsideSize, setLeftAsideSize] = useState(350)
  const rightAsideSize = 450;
  const collapseSize = 120
  
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
  const { pathname } = useLocation();
  // const sectionDimension = {
  //   width: `calc(100% - ${leftAsideSize + rightAsideSize}px)`,
  //   marginLeft: `${leftAsideSize}px`,
  // };

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
<<<<<<< HEAD
    const firstPath = path.split("/").pop();
    const secondPath = firstPath?.split("-").join(" ");
    return secondPath;
  };
  return (
    <div className="min-h-screen ">
=======
    const firstPath = path.split("/").pop()
    const secondPath = firstPath?.split("-").join(" ")
    return secondPath
    
  }
  return (
    <div className="min-h-screen flex">
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
      <aside
        className=" fixed top-0 left-0 h-full p-6 overflow-auto bg-white/5 backdrop-blur-xl border border-white/10"
        style={{ width: leftAsideSize, transition: "0.2s" }}>
        <div
          className={` h-full rounded-[28px] shadow-2xl px-4 py-6  flex flex-col ${leftAsideSize === collapseSize ? "items-center" : ""} transition-all duration-500 ease-in-out`}
          style={{
            background:
              "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
          }}>
          <div className="animate__animated animate__fadeIn">
            <Avatar
              title={leftAsideSize === collapseSize ? null : "Jammie wilson"}
              size={leftAsideSize === collapseSize ? "md" : "lg"}
              subtitle="full stack developer"
              titleColor="white"
              subtitleColor="#ddd"
              image="/images/woman.png"></Avatar>
          </div>

          <div className="border-b border-white/10 pt-2 mt-5 -mx-4" />
          <div className="flex flex-col gap-2 flex-1 pt-2 mt-6">
            {menus.map((item, idx) => (
              <Link
                title={item.label}
                to={item.href}
                key={idx}
                className={`flex items-center gap-3 px-3.5 py-2.5   rounded-xl text-[#b8aadf] text-sm font-medium
<<<<<<< HEAD
                         transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]`}>
=======
              transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]`}>
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
                <i className={`${item.icon} text-xl`}></i>
                <span
                  className={`capitalize ${leftAsideSize === collapseSize ? "hidden " : ""}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-2 ">
            <button
              title="logout"
              className="  flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
          text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
          hover:bg-red-500/15 hover:text-red-300 mt-3">
              <i className="ri-logout-box-r-line text-xl"></i>
              <span className={leftAsideSize === collapseSize ? "hidden" : ""}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      <section
<<<<<<< HEAD
        className="rounded-2xl py-8 px-1 "
=======
        className="rounded-2xl py-8 px-1"
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
        style={{
          width: `calc(100% - ${leftAsideSize + rightAsideSize}px)`,
          marginLeft: leftAsideSize,
          transition: "0.2s",
        }}>
        <Card
          title={
            <div className="flex gap-6 items-center ">
              <button
                className="bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200"
                onClick={() =>
                  setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
                }>
                <i className="ri-arrow-left-line"></i>
              </button>
              <h1>{getPathName(pathname)}</h1>
            </div>
          }>
          <Outlet />
        </Card>
      </section>
<<<<<<< HEAD

=======
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
      <aside
        className="bg-white fixed top-0 right-0 h-full p-8 overflow-auto "
        style={{ width: rightAsideSize }}>
        <Card title="my friends" divider>
          <div className="space-y-5 ">
            {Array(20)
              .fill(0)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-gray-100 rounded-lg  flex justify-between">
                  <Avatar
                    size="md"
                    image="/images/man1.png"
                    title="John adams"
                    subtitle={
                      <small
                        className={`${idx % 2 === 0 ? "text-green-400" : "text-zinc-400"}`}>
                        {idx % 2 === 0 ? "Online" : "Offline"}
                      </small>
                    }
                  />
                  <div className="space-x-3">
                    <button className="" title="chat">
                      <i className="ri-chat-ai-line text-blue-500 hover:text-blue-600"></i>
                    </button>
                    <button className="" title="audio call">
                      <i className="ri-phone-line text-indigo-500 hover:text-indigo-600 "></i>
                    </button>
                    <button className="" title="video call">
                      <i className="ri-video-on-ai-line text-emerald-500 hover:text-emerald-600"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </aside>
    </div>
  );
};

export default Layout;
<<<<<<< HEAD
 */

import { Link, Outlet, useLocation } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useState } from "react";

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const rightAsideSize = 450;
  const collapseSize = 130;

  const { pathname } = useLocation();

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
    const secondPath = firstPath?.split("-").join(" ");
    return secondPath;
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
      {/* LEFT NAVIGATION DRAWER */}
      {/* Mobile: Bottom Fixed Bar | Desktop: Fixed Left Sidebar with state width changes */}
      <aside
        className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
                   lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
        style={
          {
            width: "var(--left-width, 100%)",
            transition: "width 0.2s ease-in-out",
            "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`, // Flips gracefully using pure CSS rules on desktop layouts
          } as React.CSSProperties
        }>
        {/* We use a Tailwind override to break standard mobile dimensions on desktop viewports */}
        <div
          className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
            leftAsideSize === collapseSize ? "lg:items-center" : ""
          } transition-all duration-500 ease-in-out`}
          style={{
            background:
              "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
          }}>
          {/* User Profile */}
          <div className="hidden lg:block animate__animated animate__fadeIn">
            <Avatar
              title={leftAsideSize === collapseSize ? null : "Jammie wilson"}
              size={leftAsideSize === collapseSize ? "md" : "lg"}
              subtitle="full stack developer"
              titleColor="white"
              subtitleColor="#ddd"
              image="/images/woman.png"
            />
          </div>

          <div className="hidden lg:block border-b border-white/10 pt-2 mt-5 -mx-4" />

          {/* Navigation Links */}
          <div className="flex flex-row lg:flex-col justify-around lg:justify-start gap-2 flex-1 lg:pt-2 lg:mt-6 w-full">
            {menus.map((item, idx) => (
              <Link
                title={item.label}
                to={item.href}
                key={idx}
                className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 px-3 py-1.5 lg:px-3.5 lg:py-2.5 rounded-xl text-[#b8aadf] text-xs lg:text-sm font-medium
                           transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]">
                <i className={`${item.icon} text-lg lg:text-xl`}></i>
                <span
                  className={`capitalize ${leftAsideSize === collapseSize ? "lg:hidden" : ""}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:block border-t border-white/10 pt-2">
            <button
              title="logout"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl w-full text-left
                        text-[#b8aadf] text-sm font-medium transition-all duration-150 cursor-pointer
                        hover:bg-red-500/15 hover:text-red-300 mt-3">
              <i className="ri-logout-box-r-line text-xl"></i>
              <span
                className={leftAsideSize === collapseSize ? "lg:hidden" : ""}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      {/* Uses pure CSS calc properties to dynamically subtract spacing parameters without layout shifts */}
      <main
        className="flex-1 rounded-2xl py-6 px-4 mb-20 lg:mb-0 lg:py-8 lg:px-6 w-full"
        style={
          {
            width: "100%",
            marginLeft: "var(--main-ml, 0px)",
            marginRight: "var(--main-mr, 0px)",
            transition: "margin 0.3s ease-in-out",
            // Real-time CSS calc values targeting desktop boundaries natively
            "--main-ml": `calc(0px + ${leftAsideSize}px)`,
            "--main-mr": `calc(0px + ${rightAsideSize}px)`,
          } as React.CSSProperties
        }>
        <Card
          title={
            <div className="flex gap-6 items-center">
              <button
                className="hidden lg:block bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200 cursor-pointer"
                onClick={() =>
                  setLeftAsideSize(leftAsideSize === 350 ? collapseSize : 350)
                }>
                <i
                  className={
                    leftAsideSize === collapseSize
                      ? "ri-arrow-right-line"
                      : "ri-arrow-left-line"
                  }></i>
              </button>
              <h1 className="text-xl font-bold text-slate-800 lg:text-2xl">
                {getPathName(pathname)}
              </h1>
            </div>
          }>
          <Outlet />
        </Card>
      </main>

      {/* RIGHT FRIENDS DRAWER */}
      {/* Mobile: Bottom linear stack | Desktop: Hard-locked right edge panel using safe width specifications */}
      <aside
        className="bg-white p-4 lg:p-8 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100
                   w-full lg:fixed lg:top-0 lg:right-0 lg:h-full"
        style={
          {
            width: "100%",
            maxWidth: "var(--right-max-w, 100%)",
            "--right-max-w": `calc(0px + ${rightAsideSize}px)`, // Enforces hard structural limits cleanly on zoom
          } as React.CSSProperties
        }>
        <Card title="my friends" divider>
          <div className="space-y-4 max-h-125 lg:max-h-none overflow-y-auto pr-1">
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

                  {/* Action Row Fixed Order: Message -> Audio -> Video */}
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
        </Card>
      </aside>

      {/* Embedded CSS Breakpoint overrides so standard styles behave flawlessly on browser zoom events */}
      <style>{`
        @media (max-width: 1023px) {
          aside, main {
            margin-left: 0px !important;
            margin-right: 0px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
=======
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
