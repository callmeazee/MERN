/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../../Context";
import Form, { type FormDataType } from "../shared/Form";
import socket from "../../lib/socket";
import Input from "../shared/Input";
import useSWR from "swr";
import Fetcher from "../../lib/Fetcher";
import { v4 as uuid } from "uuid";
import CatchError from "../../lib/CatchError";
import HttpInterceptor from "../../lib/HttpInterceptor";
import Card from "../shared/Card";
import Button from "../shared/Button";
import moment from "moment";

// FIX: Added 'id', '_id', and 'to' so TypeScript recognizes the filter checks below
interface MessageReceivedInterface extends AttachmentInterface {
  online?: any;
  from: { fullname: string; id?: string; _id?: string; image?: string };
  to?: string;
  message: string;
  time: string;
  createdAt: string;
}
interface AttachmentInterface {
  file: {
    path: string;
    type: string;
  };
}
const AttachmentUi: FC<AttachmentInterface> = ({ file }) => {
  if (file.type.startsWith("video/"))
    return <video className="w-full" controls src={file.path}></video>;
  if (file.type.startsWith("image/"))
    return <img className="w-full" src={file.path} />;
  return (
    <Card>
      <i className="ri-file-line"></i>
    </Card>
  );
};

const Chat = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const { session } = useContext(Context);

  const { id } = useParams();

  const { data } = useSWR(id ? `/chat/${id}` : null, id ? Fetcher : null);

  const [messageText, setMessageText] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(true);

  interface ActiveUserType {
    name?: string;
    initials?: string;
    status?: string;
    image?: string;
  }

  const [activeUser, setActiveUser] = useState<ActiveUserType>({
    name: "",
    initials: "",
    status: "Offline",
    image: "",
  });

  const [chats, setChats] = useState<any>([]);
  const handleSelectUser = (chat: MessageReceivedInterface) => {
    setActiveUser({
      name: chat.from.fullname,
      initials: chat.from.fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      status: chat.online ? "Online" : "Offline",
      image: "",
    });
    setIsMobileChatOpen(true);
  };

  const attachmentHandler = (messageReceived: MessageReceivedInterface) => {
    setChats((prev: any) => [...prev, messageReceived]);
  };
  // ==========================================
  // FIX: STRICT MESSAGE FILTERING & DEPENDENCIES
  //  ==========================================
  //listening all socket events
  useEffect(() => {
    const currentUserId = session?.id || session?._id;

    const messageHandler = (messageReceived: MessageReceivedInterface) => {
      // 1. Ignore if the message was sent by us (stops double-rendering our own messages)
      if (
        messageReceived.from?.id === currentUserId ||
        messageReceived.from?._id === currentUserId
      )
        return;

      // 2. THE FIX: Ignore if the message is addressed to someone else (Stops broadcast bleed!)
      if (messageReceived.to && messageReceived.to !== currentUserId) return;

      // 3. Optional: Only show messages in THIS window if they are from the person matching the URL 'id'
      if (messageReceived.from?.id !== id && messageReceived.from?._id !== id)
        return;

      setChats((prev: any) => [...prev, messageReceived]);
    };

    socket.on("message", messageHandler);
    socket.on("attachment", attachmentHandler);

    return () => {
      socket.off("message", messageHandler);
      socket.off("attachment", attachmentHandler);
    };
  }, [session, id]); // Crucial: Added dependencies so the listener always knows who is logged in

  //setting old chats
  useEffect(() => {
    if (data && data.length > 0) {
      setChats(data);
      const other = data.find(
        (m: any) => m.from?._id !== session?.id && m.from?.fullname,
      );
      if (other) {
        setActiveUser({
          name: other.from.fullname,
          initials: other.from.fullname
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase(),
          status: "Online",
          image: other.from.image || "",
        });
      }
    }
  }, [data]);

  //setup scrollbar position
  useEffect(() => {
    const chatDiv = chatContainer.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [chats]);

  const sendMessage = (values: FormDataType) => {
    const text = (values?.message as string) || messageText || "";
    if (!text.trim()) return;

    const payload = {
      from: session,
      to: id,
      message: values.message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Added time generation locally
    };

    setChats((prev: any) => [...prev, payload]);
    socket.emit("message", payload);
  };

  const fileSharing = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target;
      if (!input.files) return;
      const file = input.files[0];
      const url = URL.createObjectURL(file);
      const ext = file.name.split(".").pop();
      const filename = `${uuid()}.${ext}`;
      const path = `chats/${filename}`;
      const payload = {
        path,
        type: file.type,
        status: "private",
      };
      const options = {
        headers: {
          "Content-Type": file.type,
        },
      };

      const { data } = await HttpInterceptor.post("/storage/upload", payload);
      await HttpInterceptor.put(data.url, file, options);
      const remoteMetaData = {
        file: {
          path: path,
          type: file.type,
        },
      };
      const localMetaData = {
        file: {
          path: url,
          type: file.type,
        },
      };
      const attachmentPayload = {
        from: session,
        to: id,
        message: filename,
      };

      setChats((prev: any) => [
        ...prev,
        { ...attachmentPayload, ...localMetaData },
      ]);
      socket.emit("attachment", {
        ...attachmentPayload,
        ...remoteMetaData,
      });
    } catch (err) {
      CatchError(err);
    }
  };

  const download = async (filename: string) => {
    try {
      const path = `chats/${filename}`;
      const { data } = await HttpInterceptor.post("/storage/download", {
        path,
      });
      const a = document.createElement("a");
      a.href = data.url;
      a.download = filename;
      a.click();
      a.remove();
    } catch (err) {
      CatchError(err);
    }
  };

  return (
    <div className="flex h-[calc(100vh-240px)] lg:h-[calc(100vh-160px)] w-full max-w-full min-w-0 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm relative">
      {/* 1. CHAT LIST SIDEBAR */}
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
          {chats.map((chat: MessageReceivedInterface, idx: number) => (
            <div
              key={idx}
              onClick={() => handleSelectUser(chat)}
              className={`p-3.5 flex items-center justify-between cursor-pointer transition-all capitalize  ${
                activeUser?.name === chat?.from.fullname
                  ? "bg-indigo-50/60 border-l-4 border-indigo-600 pl-2.5"
                  : "hover:bg-gray-50"
              }`}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {chat.from.image ? (
                      <img
                        className="object-cover rounded-full "
                        src={chat.from.image}
                      />
                    ) : (
                      chat.from.fullname
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                    )}
                  </div>
                  {chat && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-700 truncate">
                    {chat.from.fullname}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {chat.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                <span className="text-[10px] font-medium text-slate-400">
                  {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CHAT STREAM BOX VIEWER CONTAINER */}
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
              <h3 className="text-sm font-bold text-slate-800 truncate capitalize">
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
        <div
          ref={chatContainer}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {chats.map((msg: MessageReceivedInterface, idx: number) => {
            // FIX: Evaluate 'isMe' directly against the MAPPED msg item, not the undefined array.
            // MORE ROBUST:
            const isMe =
              msg.from?.id === session?.id ||
              msg.from?._id?.toString() === session?.id;

            return (
              <div
                key={idx}
                className={`flex flex-col w-full ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[11px] font-semibold text-slate-400 mb-1 px-1 capitalize">
                  {isMe ? "You" : msg.from?.fullname}
                </span>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] md:max-w-[80%] lg:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white text-slate-700 border border-gray-100 rounded-tl-none"
                  }`}>
                  {/* FIX: corrected warp-break-words typo to standard Tailwind break-words */}
                  {msg.file && <AttachmentUi file={msg.file} />}
                  <p className="leading-relaxed break-word whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  {msg.file && (
                    <div>
                      <Button
                        onClick={() => download(msg.message)}
                        icon="download-line"></Button>
                    </div>
                  )}
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isMe ? "text-indigo-200" : "text-slate-400"
                    }`}>
                    {moment(msg.createdAt).format("MMM DD, YYYY hh:mm A")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Form */}
        <Form
          onValue={sendMessage}
          reset
          className="p-3 bg-white border-t border-gray-100 flex items-center gap-3 shrink-0">
          <div className="flex-1 relative flex items-center min-w-0 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-indigo-500/50 focus-within:bg-white transition-all">
            {/* FIX: Removed the dot and changed to -rotate-45 to stand straight up */}
            {/* <input
              type="file"
              className="pl-3 pr-2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer py-2 flex items-center justify-center"
              aria-label="Attach file"
            />

            <i className="ri-attachment-2 text-xl rotate-180"></i> */}
            <input
              onChange={fileSharing}
              type="file"
              id="file-upload"
              className="hidden" // Use Tailwind's 'hidden' utility to remove it from view
            />

            {/* Label acts as the clickable trigger for the input */}
            <label
              htmlFor="file-upload"
              className="pl-3 pr-2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer py-2 flex items-center justify-center">
              <i className="ri-attachment-2 text-xl rotate-180"></i>
            </label>

            <Input
              type="text"
              name="message"
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Write a message to ${activeUser.name}...`}
              className="w-full pl-1 pr-12 py-3 bg-transparent text-sm focus:outline-none text-slate-700"
            />

            <button
              type="button"
              className="absolute right-3 text-slate-400 hover:text-indigo-500 cursor-pointer p-1">
              <i className="ri-emotion-happy-line text-lg"></i>
            </button>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white h-11 w-11 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95 cursor-pointer shrink-0">
            <i className="ri-send-plane-2-fill text-lg ml-0.5"></i>
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
