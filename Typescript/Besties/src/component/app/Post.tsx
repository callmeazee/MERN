import Button from "../shared/Button";
import Card from "../shared/Card";
import Divider from "../shared/divider";
 // Capitalized import to match design conventions
import IconButton from "../shared/IconButton";

const Post = () => {
  // Mock array to hook easily into live backend database array payloads
  const postsList = Array(20).fill({
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio excepturi, ex perspiciatis magnam totam similique incidunt quasi quo voluptas odit distinctio aut nostrum, id eos, repudiandae corrupti aliquam blanditiis.",
    date: "Jan 2, 2030",
    time: "7:00 PM",
    likes: "20k",
    dislikes: "2k",
    commentsCount: "1.5k",
  });

  return (
    <div className="space-y-6 md:space-y-8 w-full min-w-0">
      {postsList.map((post, idx) => (
        <Card
          key={idx}
          className="hover:shadow-md transition-shadow duration-300">
          <div className="space-y-4">
            {/* POST TEXT BODY */}
            <p className="text-sm md:text-base text-slate-600 leading-relaxed wrap-break-words">
              {post.content}
            </p>

            {/* METADATA TIMESTAMPS & QUICK EDIT ACTIONS ROW */}
            <div className="flex justify-between items-center bg-slate-50/50 p-2  rounded-xl border border-slate-100">
              {/* Changed semantic tag to native time tag */}
              <time className="text-xs md:text-sm font-medium text-slate-400 px-1">
                {post.date} • {post.time}
              </time>

              {/* Context Action Row Utilities */}
              <div className="flex items-center gap-2">
                <IconButton
                  type="primary"
                  icon="edit-line"
                  title="Edit Post"
                  className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white"
                />
                <IconButton
                  type="danger"
                  icon="delete-bin-4-line"
                  title="Delete Post"
                  className="w-6 h-6 rounded-lg bg-rose-500/40 text-rose-500 hover:bg-rose-600 hover:text-white"
                />
              </div>
            </div>

            {/* REUSABLE SHARED HIGH-ACCESSIBILITY DIVIDER */}
            <Divider className="my-2 border-slate-100" />

            {/* SOCIAL ENGAGEMENT ACTION ROW */}
            {/* FIX: Replaced space-x-4 with flex-wrap and gap parameters so buttons align safely if wrapped on mobile */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1">
              <Button
                icon="thumb-up-line"
                type="primary"
                className="bg-blue-500/50 text-blue-600 hover:bg-blue-600 hover:text-white text-xs sm:text-sm py-2 rounded-xl">
                {post.likes}
              </Button>

              <Button
                icon="thumb-down-line"
                type="warning"
                className="bg-amber-500/50 text-amber-600 hover:bg-amber-600 hover:text-white text-xs sm:text-sm py-2 rounded-xl">
                {post.dislikes}
              </Button>

              {/* FIX: Swapped broken non-existent icon string 'chat-ai-line' with valid 'chat-3-line' */}
              <Button
                icon="chat-3-line"
                type="secondary"
                className="bg-indigo-500/50 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs sm:text-sm py-2 rounded-xl">
                {post.commentsCount}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Post;
