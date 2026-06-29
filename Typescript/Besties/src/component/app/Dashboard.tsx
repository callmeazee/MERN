import { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";
import Divider from "../shared/Divider";
import IconButton from "../shared/IconButton";


const Dashboard = () => {
  const [newPostText, setNewPostText] = useState("");

  // Mock global network feed dataset representation
  const [feedPosts, setFeedPosts] = useState([
    {
      id: 1,
      author: "Azee Khan",
      initials: "AK",
      role: "UI/UX Designer",
      caption:
        "🎨 Designing with uniform geometric systems makes components sing",
      content:
        "Just wrapped up auditing the global layout view specs. Dropping forced asymmetrical horizontal paddings from deep child containers completely mitigates panel clip bleed errors. Always enforce clear flex containment boundaries!",
      timeAgo: "10 mins ago",
      likes: "24",
      hasLiked: false,
      commentsCount: "3",
    },
    {
      id: 2,
      author: "John Adams",
      initials: "JA",
      role: "DevOps Engineer",
      caption: "⚡ Migrating architecture pipelines to modern build runners",
      content:
        "Ran a sequence of compilation profiling benchmarks on the fresh component layout configuration files. Cold starts dropped significantly after purging dynamic single-instance window listeners and leaning entirely on native CSS calc custom variables.",
      timeAgo: "2 hours ago",
      likes: "56",
      hasLiked: true,
      commentsCount: "14",
    },
  ]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "Rahul Kumar", // Injected auth context profile
      initials: "RK",
      role: "Full Stack Developer",
      caption: "🚀 Broadcasted from dashboard composition banner",
      content: newPostText,
      timeAgo: "Just now",
      likes: "0",
      hasLiked: false,
      commentsCount: "0",
    };

    setFeedPosts([newPost, ...feedPosts]);
    setNewPostText("");
  };

  const handleLikeToggle = (id: number) => {
    setFeedPosts(
      feedPosts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            hasLiked: !post.hasLiked,
            likes: post.hasLiked
              ? String(parseInt(post.likes) - 1)
              : String(parseInt(post.likes) + 1),
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="space-y-6 w-full min-w-0 animate__animated animate__fadeIn">
      {/* <Editor/> */}
      {/* 1. COMPOSITION BANNER (CREATE NEW POST COMPONENT) */}
      <Card className="border-indigo-500/10 shadow-sm">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex gap-3 items-start">
            {/* Quick Author Identity Circle */}
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
              RK
            </div>
            {/* Textarea Input Field */}
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind? Share an update with your network..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-500/40 focus:bg-white transition-all resize-none leading-relaxed"
            />
          </div>

          {/* Action Footer split row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              <IconButton
                type="primary"
                icon="image-add-line"
                title="Upload Media File"
                className="w-9 h-9 rounded-xl bg-blue-500/5 text-blue-500 hover:bg-blue-500 hover:text-white"
              />
            </div>

            <Button
              type="secondary"
              icon="send-plane-fill"
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer shadow-md shadow-indigo-100">
              Publish Post
            </Button>
          </div>
        </form>
      </Card>

      {/* 2. MAIN SYSTEM FEED STREAM CONTAINER */}
      <div className="space-y-6">
        {feedPosts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-md transition-shadow duration-300">
            <div className="space-y-4">
              {/* FEED ENTRY AUTHOR PANEL HEADER */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-inner">
                    {post.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 leading-none truncate w-full">
                      {post.author}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-1 truncate w-full max-w-40">
                      {post.role}
                    </p>
                  </div>
                </div>

                {/* Visual Timestamp Meta Data */}
                <span className="text-[11px] font-medium text-slate-400 shrink-0 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100/50">
                  {post.timeAgo}
                </span>
              </div>

              {/* POST CONTENT INSIDE CLEAN CARD BODY */}
              <div className="space-y-2 px-1">
                <h4 className="text-sm md:text-base font-bold text-slate-800 tracking-tight leading-snug">
                  {post.caption}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed warp-break-words">
                  {post.content}
                </p>
              </div>

              <Divider className="my-1 border-slate-100" />

              {/* ENGAGEMENT MATRIX CONTROL FOOTER */}
              <div className="flex items-center gap-1 sm:gap-2 pt-0.5 w-full">
                {/* Dynamic Like Toggle Button Link */}
                <button
                  onClick={() => handleLikeToggle(post.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors group cursor-pointer ${
                    post.hasLiked
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}>
                  <i
                    className={`text-base transition-transform group-active:scale-125 ${
                      post.hasLiked
                        ? "ri-thumb-up-fill text-blue-500"
                        : "ri-thumb-up-line text-slate-400 group-hover:text-blue-500"
                    }`}></i>
                  <span>{post.likes}</span>
                </button>

                {/* Standard Comment Drawer Anchor link */}
                <button
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-50 transition-colors group cursor-pointer ml-auto"
                  onClick={() =>
                    alert(
                      `Opening conversation comments feed thread window for post ID: ${post.id}`,
                    )
                  }>
                  <i className="ri-chat-3-line text-base text-slate-400 group-hover:text-indigo-500 transition-colors"></i>
                  <span className="group-hover:text-slate-700">
                    {post.commentsCount} Comments
                  </span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
