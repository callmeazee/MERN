

import { Link, Outlet, useLocation } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useState } from "react";
import type { CSSProperties} from 'react'

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
          } as CSSProperties
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
        className="p-4 lg:p-6 overflow-auto border-t lg:border-t-0 lg:border-l border-gray-100 w-full lg:fixed lg:top-0 lg:right-0 lg:h-full z-40"
        style={
          {
            width: "100%",
            maxWidth: "var(--right-max-w, 100%)",
            "--right-max-w": `calc(0px + ${rightAsideSize}px)`,
          } as React.CSSProperties
        }>
        <Card className="h-full" noPadding>
          <div className="flex flex-col h-full divide-y divide-gray-100">
            {/* 1. SUGGESTED FRIENDS SECTION (TOP) */}
            <div className="p-4 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Suggested Friends
                </h2>
                <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                  See All
                </button>
              </div>

              {/* Horizontal Scrollable Row for Suggestions */}
              <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x">
                {Array(15)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center min-w-27.5 snap-start hover:shadow-sm transition-shadow">
                      {/* Compact Avatar Fallback */}
                      <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-2 shadow-sm">
                        SF
                      </div>
                      <h4 className="text-xs font-bold text-slate-700 truncate w-full max-w-22.5">
                        Alex Rivera
                      </h4>
                      <p className="text-[10px] text-slate-400 mb-2 truncate w-full max-w-22.5">
                        Mutual Friend
                      </p>
                      {/* Quick Add Button */}
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-colors w-full cursor-pointer flex items-center justify-center gap-1">
                        <i className="ri-user-add-line"></i> Add
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* 2. MY FRIENDS LIST SECTION (BOTTOM) */}
            {/* flex-1 min-h-0 and flex flex-col allows the main list to take up all remaining height perfectly */}
            <div className="flex-1 min-h-0 flex flex-col p-4">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 shrink-0">
                My Friends
              </h2>

              {/* Scrollable list frame */}
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
            </div>
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

