import { Link, Outlet, useLocation } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Card from "../shared/Card";
import { useState } from "react";

const Layout = () => {

  const [leftAsideSize, setLeftAsideSize] = useState(350)
  const rightAsideSize = 450;
  const collapseSize = 120
  
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
    const firstPath = path.split("/").pop()
    const secondPath = firstPath?.split("-").join(" ")
    return secondPath
    
  }
  return (
    <div className="min-h-screen flex">
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
              transition-all duration-150 hover:bg-white/90 hover:text-[#1e1060]`}>
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
        className="rounded-2xl py-8 px-1"
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
