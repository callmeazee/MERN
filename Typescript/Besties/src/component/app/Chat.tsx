import { useState } from "react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [messageText, setMessageText] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const [activeUser, setActiveUser] = useState({
    name: "Azee Khan",
    initials: "AK",
    status: "Online",
    image: "",
  });

  const conversations = [
    {
      name: "Azee Khan",
      initials: "AK",
      latestMsg: "Are we jumping on the call?",
      time: "12:45 PM",
      unread: 2,
      online: true,
    },
    {
      name: "Rahul Kumar",
      initials: "RK",
      latestMsg: "Merged the responsive layout layout fix!",
      time: "11:20 AM",
      unread: 0,
      online: true,
    },
    {
      name: "John Adams",
      initials: "JA",
      latestMsg: "Let me check the logs real quick.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      senderName: "Azee Khan",
      text: "Hey! Did you check out the new chat view layout?",
      time: "12:30 PM",
    },
    {
      id: 2,
      sender: "me",
      senderName: "Rahul Kumar",
      text: "Yeah, it matches the app theme layout perfectly now. Fluid dimensions are awesome.",
      time: "12:32 PM",
    },
    {
      id: 3,
      sender: "them",
      senderName: "Azee Khan",
      text: "Awesome! Are we jumping on the call?",
      time: "12:45 PM",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        senderName: "Rahul Kumar",
        text: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageText("");
  };

  const handleSelectUser = (chat: (typeof conversations)[0]) => {
    setActiveUser({ ...chat, status: chat.online ? "Online" : "Offline", image: "" });
    setIsMobileChatOpen(true);
  };

  return (
    // FIX: Using w-full max-w-full and min-w-0 ensures flex elements calculate space natively inside the parent layout wrapper
    <div className="flex h-[calc(100vh-240px)] lg:h-[calc(100vh-160px)] w-full max-w-full min-w-0 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm relative">
      {/* 1. CHAT LIST SIDEBAR */}
      {/* FIX: Set a strict max-width and min-width range so it stays stable without crushing the chat view */}
      <div
        className={`w-full md:w-64 lg:w-72 flex flex-col bg-slate-50/50 shrink-0 border-r border-gray-100 ${
          isMobileChatOpen ? "hidden md:flex" : "flex"
        }`}>
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <i className="ri-search-line absolute left-3 top-2.5 text-slate-400 text-sm"></i>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {conversations.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectUser(chat)}
              className={`p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                activeUser.name === chat.name
                  ? "bg-indigo-50/60 border-l-4 border-indigo-600 pl-2.5"
                  : "hover:bg-gray-50"
              }`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {chat.initials}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-700 truncate">
                    {chat.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {chat.latestMsg}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                <span className="text-[10px] font-medium text-slate-400">
                  {chat.time}
                </span>
                {chat.unread > 0 && (
                  <span className="bg-indigo-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CHAT STREAM BOX VIEWER CONTAINER */}
      {/* FIX: min-w-0 forces the flex container to acknowledge the true boundary instead of overflowing behind the friends panel */}
      <div
        className={`flex-1 min-w-0 flex flex-col bg-white ${
          isMobileChatOpen ? "flex" : "hidden md:flex"
        }`}>
        {/* Chat Active Box Header Window */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shadow-sm bg-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="block md:hidden bg-gray-100 w-9 h-9 rounded-full hover:bg-slate-200 cursor-pointer text-slate-600 shrink-0">
              <i className="ri-arrow-left-line text-lg flex items-center justify-center h-full"></i>
            </button>

            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
              {activeUser.initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-800 truncate">
                {activeUser.name}
              </h3>
              <p className="text-[11px] font-medium text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {activeUser.status}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Link
              to="/app/audio"
              className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors">
              <i className="ri-phone-line text-lg"></i>
            </Link>
            <Link
              to="/app/video"
              className="p-2 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-50 transition-colors">
              <i className="ri-video-on-line text-lg"></i>
            </Link>
          </div>
        </div>

        {/* Scrollable Message Box Track */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col w-full ${msg.sender === "me" ? "items-end" : "items-start"}`}>
              <span className="text-[11px] font-semibold text-slate-400 mb-1 px-1">
                {msg.sender === "me" ? "You" : msg.senderName}
              </span>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === "me"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-gray-100 rounded-tl-none"
                }`}>
                <p className="leading-relaxed warp-break-words">{msg.text}</p>
                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.sender === "me" ? "text-indigo-200" : "text-slate-400"
                  }`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

    
        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0">
          <div className="flex-1 relative flex items-center min-w-0 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-indigo-500/50 focus-within:bg-white transition-all">
            {/* NEW: ATTACHMENT BUTTON (Placed on the left inside the text input box) */}
            <button
              type="button"
              className="pl-3 pr-2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer py-2 flex items-center justify-center"
              title="Attach file"
              onClick={() => alert("File attachment click handled!")} // Replace with your file picker logic
            >
              <i className="ri-attachment-2 text-xl .rotate-45"></i>
            </button>

            {/* Input Field - Left padding adjusted to accommodate the attachment button */}
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Write a message to ${activeUser.name}...`}
              className="w-full pl-1 pr-12 py-3 bg-transparent text-sm focus:outline-none text-slate-700"
            />

            {/* Contextual Emoji Trigger (Kept on the right inside the input box) */}
            <button
              type="button"
              className="absolute right-3 text-slate-400 hover:text-indigo-500 cursor-pointer p-1">
              <i className="ri-emotion-happy-line text-lg"></i>
            </button>
          </div>

          {/* Submitting Message Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white h-11 w-11 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95 cursor-pointer flex-shrink-0">
            <i className="ri-send-plane-2-fill text-lg ml-0.5"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
