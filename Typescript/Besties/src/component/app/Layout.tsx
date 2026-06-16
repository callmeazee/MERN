import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useContext, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Context from "../../Context";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { v4 as uuid } from "uuid";
import useSWR, { mutate } from "swr";
import Fetcher from "../../lib/Fetcher";
import CatchError from "../../lib/CatchError";
import FriendSuggestion from "./FriendSuggestion";
import FriendList from "./FriendList";
import axios from "axios";

import FriendRequests from "./FriendRequests";

const eightMinutesInMillisecond = 8 * 60 * 1000;

const Layout = () => {
  const [leftAsideSize, setLeftAsideSize] = useState(350);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false); // UX State for Bottom Sheet
  const rightAsideSize = 450;
  const collapseSize = 130;

  const { error } = useSWR("/auth/refresh-token", Fetcher, {
    refreshInterval: eightMinutesInMillisecond,
    shouldRetryOnError: false,
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { session, setSession } = useContext(Context);

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
        path: path,
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
        console.log(data);
        await axios.put(data.url, file, options);
        const { data: user } = await HttpInterceptor.put(
          "/auth/profile-picture",
          { path: path },
        );
        setSession({ ...session, image: user.image });
        mutate("/auth/refresh-token");
      } catch (err) {
        console.log(err);
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
    <div className="min-h-screen bg-slate-50 lg:flex lg:flex-row overflow-x-hidden">
      {/* =========================================================================
          🆕 NEW STICKY TOP BRANDING HEADER (Visible on Mobile & Tablet Views Only)
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 px-4 flex items-center justify-between lg:hidden shadow-xs">
        {/* Brand Group */}
        <div className="flex items-center gap-2">
          {/* Logo Frame Icon */}
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
            <i className="ri-heart-pulse-fill text-lg"></i>
          </div>
          {/* App Typography Name */}
          <span className="text-xl font-black tracking-tight bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent capitalize">
            besties
          </span>
        </div>

        {/* Action Controls Frame */}
        <div className="flex items-center gap-2">
          {/* Search Action Toggle button */}
          <button
            onClick={() => alert("Search functionality triggered")}
            className="w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer">
            <i className="ri-search-2-line text-lg"></i>
          </button>

          {/* Interactive Live Notifications Indicator */}
          <button
            onClick={() => alert("Notifications drawer coming soon")}
            className="w-9 h-9 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors relative cursor-pointer">
            <i className="ri-notification-3-line text-lg"></i>
            {/* Live Indicator Alert Pulse Badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* LEFT NAVIGATION DRAWER */}
      <aside
        className="fixed bottom-0 left-0 w-full z-50 p-2 bg-white/80 backdrop-blur-xl border-t border-white/20
                   lg:top-0 lg:bottom-auto lg:h-full lg:p-6 lg:border-t-0 lg:border-r lg:bg-white/5"
        style={
          {
            width: "var(--left-width, 100%)",
            transition: "width 0.2s ease-in-out",
            "--left-width": `calc(100vw * 0 + ${leftAsideSize}px)`,
          } as React.CSSProperties
        }>
        <div
          className={`h-full rounded-2xl lg:rounded-[28px] shadow-2xl px-4 py-3 lg:py-6 flex flex-row lg:flex-col justify-between lg:justify-start ${
            leftAsideSize === collapseSize ? "lg:items-center" : ""
          } transition-all duration-500 ease-in-out`}
          style={{
            background:
              "linear-gradient(160deg,#3b1f7a 0%,#1e1060 35%,#100d3a 65%,#0a0d28 100%)",
          }}>
          {/* User Profile (Desktop Only) */}
          <div className="hidden lg:block animate__animated animate__fadeIn">
            {session && (
              <Avatar
                title={leftAsideSize === collapseSize ? null : session.fullname}
                size={leftAsideSize === collapseSize ? "md" : "lg"}
                subtitle={session.email}
                titleColor="white"
                subtitleColor="#ddd"
                image={session.image || "/images/woman.png"}
                onClick={uploadImage}
              />
            )}
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

            {/* Mobile Profile Trigger Button */}
            <button
              onClick={() => setIsMobileProfileOpen(true)}
              className="flex flex-col lg:hidden items-center gap-1 px-3 py-1.5 rounded-xl text-[#b8aadf] text-xs font-medium
                         transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060] cursor-pointer">
              <img
                src={session?.image || "/images/woman.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <span className="capitalize">Profile</span>
            </button>
          </div>

          <div className="hidden lg:block border-t border-white/10 pt-2">
            <button
              onClick={logout}
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
      {/* 🛑 Added "pt-16 lg:pt-8" padding to correctly compensate for the mobile header displacement block layout height */}
      <main
        className="flex-1 rounded-2xl pt-20 pb-6 px-4 mb-2 lg:mb-0 lg:py-8 lg:px-6 w-full"
        style={
          {
            width: "100%",
            marginLeft: "var(--main-ml, 0px)",
            marginRight: "var(--main-mr, 0px)",
            transition: "margin 0.3s ease-in-out",
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
            {/* SUGGESTED FRIENDS */}
            <FriendSuggestion />
            <FriendRequests />

            {/* MY FRIENDS LIST */}
            <FriendList />
          </div>
        </Card>
      </aside>

      {/* MOBILE PROFILE BOTTOM SHEET VIEW */}
      {isMobileProfileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center">
          {/* Dark Glass Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileProfileOpen(false)}
          />

          {/* Sheet Container */}
          <div className="relative w-full bg-white rounded-t-4xl p-6 shadow-2xl transition-transform duration-300 transform translate-y-0 flex flex-col items-center z-10 max-h-[85vh] overflow-y-auto">
            {/* Grabber Indicator */}
            <div
              className="w-12 h-1.5 bg-slate-200 rounded-full mb-6 cursor-pointer"
              onClick={() => setIsMobileProfileOpen(false)}
            />

            {/* Profile Detail Overview */}
            {session && (
              <div className="flex flex-col items-center text-center w-full mb-6">
                <div
                  className="relative cursor-pointer group rounded-full overflow-hidden shadow-md active:scale-95 transition-transform"
                  onClick={() => {
                    setIsMobileProfileOpen(false);
                    uploadImage();
                  }}>
                  <Avatar
                    size="lg"
                    image={session.image || "/images/woman.png"}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                    <i className="ri-camera-line text-xl"></i>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mt-4">
                  {session.fullname}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  {session.email}
                </p>
              </div>
            )}

            <div className="w-full border-t border-slate-100 my-2" />

            {/* Functional Menu Options */}
            <div className="w-full space-y-3">
              {/* Profile Redirection Button */}
              <Link
                to="/app/profile"
                onClick={() => setIsMobileProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl w-full bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer hover:bg-slate-100">
                <i className="ri-user-settings-line text-lg text-indigo-500"></i>
                <span className="flex-1 text-left">Edit Account Details</span>
                <i className="ri-arrow-right-s-line text-slate-400"></i>
              </Link>

              {/* Mobile Destructive Action Button (Logout) */}
              <button
                onClick={() => {
                  setIsMobileProfileOpen(false);
                  logout();
                }}
                className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl w-full text-center bg-red-50 text-red-600 font-bold text-sm transition-all cursor-pointer hover:bg-red-100">
                <i className="ri-logout-box-r-line text-lg"></i>
                Logout Account
              </button>

              <button
                onClick={() => setIsMobileProfileOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-xl w-full text-center text-slate-400 text-xs font-semibold tracking-wide uppercase cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS Breakpoint overrides */}
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
