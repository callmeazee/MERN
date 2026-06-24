import { useContext, useEffect, useRef, useState } from "react";
import CatchError from "../../lib/CatchError";
import Button from "../shared/Button";
import Context from "../../Context";
import { toast } from "react-toastify";
import socket from "../../lib/socket";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { Modal } from "antd";

// Add this near the top of your component, after imports
const config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};
interface OnOfferInterface {
  offer: RTCSessionDescriptionInit;
  from: string;
}
interface OnAnswerInterface {
  answer: RTCSessionDescriptionInit;
  from: string;
}
interface OnCandidiateInterface {
  candidate: RTCIceCandidateInit;
  from: string;
}

type CallType = "pending" | "calling" | "incoming" | "talking" | "end";
type AudioSrcType = "/sound/ring.mp3" | "/sound/reject.mp3" | "/sound/busy.mp3";

const getCallDuration = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  return `${pad(mins)}:${pad(secs)}`;
};

const Video = () => {
  const navigate = useNavigate();
  const { session } = useContext(Context);
  const { id } = useParams();
  const [notify, notifyUi] = notification.useNotification();

  const localVideoContainerRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoContainerRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const rtcRef = useRef<RTCPeerConnection | null>(null);
  const remoteSocketIdRef = useRef<string | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  // const rtc = rtcRef.current;

  const [isVideoSharing, setIsVideoSharing] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<CallType>("pending");
  const [timer, setTimer] = useState(0);
  const [open, setOpen] = useState(false);

  const stopAudio = () => {
    if (!audio.current) return;
    const player = audio.current;
    player.pause();
    player.currentTime = 0;
  };

  const playAudio = (src: AudioSrcType, loop: boolean = false) => {
    stopAudio();

    if (!audio.current) audio.current = new Audio();

    const player = audio.current;
    player.src = src;
    player.loop = loop;
    player.load();
    player.play();
  };

  const toggleScreen = async () => {
    try {
      const localVideo = localVideoRef.current;
      if (!localVideo) return;
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        localVideo.srcObject = stream;
        localStreamRef.current = stream;
        setIsScreenSharing(true);
      } else {
        const localStream = localStreamRef.current;
        if (!localStream) return;
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        localVideo.srcObject = null;
        localStreamRef.current = null;
        setIsScreenSharing(false);
      }
    } catch (err) {
      CatchError(err);
    }
  };
  const toggleVideo = async () => {
    try {
      const localVideo = localVideoRef.current;
      if (!localVideo) return;

      if (!isVideoSharing) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localVideo.srcObject = stream;
        localStreamRef.current = stream;
        setIsVideoSharing(true);
        setIsMuted(false);
      } else {
        const localStream = localStreamRef.current;
        if (!localStream) return;
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        localVideo.srcObject = null;
        localStreamRef.current = null;
        setIsVideoSharing(false);
        setIsMuted(true);
      }
    } catch (err) {
      CatchError(err);
    }
  };
  const toggleMic = async () => {
    try {
      const localStream = localStreamRef.current;
      if (!localStream) return;
      const audioTrack = localStream
        .getTracks()
        .find((track) => track.kind === "audio");

      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    } catch (err) {
      CatchError(err);
    }
  };

  const toggleFullScreen = (type: "local" | "remote") => {
    try {
      if (!isVideoSharing && !isScreenSharing) {
        toast.warning("Please start your video firest! ", {
          position: "top-center",
        });
        return;
      }

      const videoContainer =
        type === "local"
          ? localVideoContainerRef.current
          : remoteVideoContainerRef.current;
      if (!videoContainer) return;
      if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } catch (err) {
      CatchError(err);
    }
  };

  //older with bugs
  /*  const webRtcConnection = () => {
    //new added line
    if (rtcRef.current) {
      return rtcRef.current;
    }

    rtcRef.current = new RTCPeerConnection(config);

    const localStream = localStreamRef.current;

    if (!rtcRef.current || !localStream) return;

    localStream.getTracks().forEach((track) => {
      rtcRef.current?.addTrack(track, localStream);
    });

    rtcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("candidate", { candidate: e.candidate, to: id });
      }
    };
    rtcRef.current.onconnectionstatechange = () => {
      console.log(rtcRef.current?.connectionState);
    };
    rtcRef.current.ontrack = (e) => {
      console.log("recieving from remote");
      const remoteStream = e.streams[0];
      const remoteVideo = remoteVideoRef.current;
      if (!remoteStream || !remoteVideo) return;

      remoteVideo.srcObject = remoteStream;
    };
  }; */

  //new with fixes
  const webRtcConnection = () => {
    if (rtcRef.current) return rtcRef.current;

    rtcRef.current = new RTCPeerConnection(config);

    const localStream = localStreamRef.current;
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        rtcRef.current?.addTrack(track, localStream);
      });
    }

    rtcRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        const target = remoteSocketIdRef.current || id;
        socket.emit("candidate", { candidate: e.candidate, to: target });
      }
    };

    rtcRef.current.onconnectionstatechange = () => {
      console.log("Connection state:", rtcRef.current?.connectionState);
    };

    rtcRef.current.ontrack = (e) => {
      //remoteStream = e.streams[0]
      //remoteVideo = remoteVideoRef.current
      if (!remoteVideoRef.current && !e.streams[0]) return;
      if (remoteVideoRef.current && e.streams[0]) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }

      const videoTracks = e.streams[0].getVideoTracks()[0];
      if (videoTracks) {
        videoTracks.onmute = () => {};
        videoTracks.onunmute = () => {};
        videoTracks.onended = () => {};
      }
    };

    return rtcRef.current;
  };

  //old
  /*   const acceptCall = async (payload: OnOfferInterface) => {
    try {
      webRtcConnection();
      console.log("ACCEPT CALL CLICKED");
      if (!rtcRef.current) return;
      const offer = new RTCSessionDescription(payload.offer);
      await rtcRef.current.setRemoteDescription(offer);

      const answer = await rtcRef.current.createAnswer();
      await rtcRef.current.setLocalDescription(answer);

      socket.emit("answer", { answer, to: id });
    } catch (err) {
      CatchError(err);
    }
  }; */

  //new
  const acceptCall = async (payload: OnOfferInterface) => {
    try {
      remoteSocketIdRef.current = payload.from; // ← Critical fix

      if (!localStreamRef.current) {
        await toggleVideo(); // ensure local media before answer
      }

      const rtc = webRtcConnection();
      const offer = new RTCSessionDescription(payload.offer);
      await rtc.setRemoteDescription(offer);

      const answer = await rtc.createAnswer();
      await rtc.setLocalDescription(answer);
      notify.destroy();
      setStatus("talking");
      stopAudio();

      socket.emit("answer", { answer, to: payload.from }); // use payload.from
    } catch (err) {
      CatchError(err);
    }
  };

  const startCall = async () => {
    try {
      if (!isVideoSharing && !isScreenSharing)
        return toast("Start your video fiirst", { position: "top-center" });
      // await toggleVideo();
      webRtcConnection();
      if (!rtcRef.current) return;
      const offer = await rtcRef.current.createOffer();
      await rtcRef.current.setLocalDescription(offer);
      setStatus("calling");
      playAudio("/sound/ring.mp3", true);
      notify.open({
        title: "Divya Kumari",
        description: "Calling....",
        duration: 30,
        placement: "bottomRight",
        onClose: stopAudio,
        actions: [
          <button
            onClick={endCallFromLocal}
            key="end"
            className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
            End Call
          </button>,
        ],
      });
      socket.emit("offer", { offer: offer, to: id });
    } catch (err) {
      CatchError(err);
    }
  };

  const redirectOnCallEnd = () => {
    setOpen(false);
    navigate("/app");
  };

  const endStreaming = () => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  //to end call on local computer
  const endCallFromLocal = () => {
    setStatus("end");
    playAudio("/sound/reject.mp3");
    notify.destroy();
    socket.emit("end", { to: id });
  };
  //this is for who end or who rejected the call
  //to end call on remote computer
  const onEndCallRemote = () => {
    setStatus("end");
    notify.destroy();
    playAudio("/sound/reject.mp3");
  };

  //EventListeners

  const onOffer = (payload: OnOfferInterface) => {
    setStatus("incoming");

    notify.open({
      title: "Azee Khan",
      description: "Incoming call...",
      duration: 30,
      placement: "bottomRight",
      actions: [
        <div key="calls" className="space-x-3">
          <button
            onClick={() => acceptCall(payload)}
            className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-green-400 justify-center shadow-none h-10 hover:bg-green-500">
            Accept
          </button>
          <button
            onClick={endCallFromLocal}
            className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500">
            Decline
          </button>
        </div>,
      ],
    });
  };

  //connect both users via webRTC
  const onCandidate = async (payload: OnCandidiateInterface) => {
    try {
      if (!rtcRef.current) return;
      //const candidate = new RTCIceCandidate(payload.candidate);
      await rtcRef.current.addIceCandidate(
        new RTCIceCandidate(payload.candidate),
      );
    } catch (err) {
      CatchError(err);
    }
  };

  const onAnswer = async (payload: OnAnswerInterface) => {
    try {
      if (!rtcRef.current) return;

      //const answer = new RTCSessionDescription(payload.answer);
      await rtcRef.current.setRemoteDescription(
        new RTCSessionDescription(payload.answer),
      );
      setStatus("talking");
      notify.destroy();
      stopAudio();
      // console.log("REMOTE DESCRIPTION SET");
    } catch (err) {
      CatchError(err);
    }
  };

  useEffect(() => {
    socket.on("offer", onOffer);
    socket.on("candidate", onCandidate);

    socket.on("answer", onAnswer);
    socket.on("end", onEndCallRemote);
    return () => {
      socket.off("offer", onOffer);
      socket.off("candidate", onCandidate);

      socket.off("answer", onAnswer);
      socket.off("end", onEndCallRemote);
    };
  }, []);

  //control sound
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   let interval: any;
  //   if (status === "pending") return;

  //   if (!audio.current) {
  //     clearInterval(interval);
  //     audio.current = new Audio();
  //   }
  //   // if (status === "calling") {
  //   //   audio.current.pause();

  //   //   audio.current.currentTime = 0;
  //   // }
  //   if (status === "calling" || status === "incoming") {
  //     clearInterval(interval);
  //     audio.current.pause();
  //     audio.current.src = "/sound/ring.mp3";
  //     audio.current.currentTime = 0;
  //     audio.current.load();
  //     audio.current.play();
  //   }
  //   if (status === "talking") {
  //     clearInterval(interval);
  //     clearInterval(interval);
  //     audio.current.pause();
  //     audio.current.currentTime = 0;
  //     // eslint-disable-next-line no-useless-assignment
  //     interval = setInterval(() => {
  //       setTimer((prev) => prev + 1);
  //     }, 1000);
  //   }
  //   if (status === "end") {
  //     clearInterval(interval);
  //     audio.current.pause();
  //     audio.current.src = "/sound/reject.mp3";
  //     audio.current.currentTime = 0;
  //     audio.current.load();
  //     audio.current.play();
  //     notify.destroy();
  //   }

  //   return () => {
  //     if (audio.current) {
  //       audio.current.pause();
  //       audio.current.currentTime = 0;
  //       audio.current = null;
  //     }
  //     clearInterval(interval);
  //   };
  // }, [status]);

  return (
    <div className="space-y-4 p-3">
      {/* PRINCIPAL PRIMARY FEED CAM WORKSPACE VIEWPORT */}
      <div
        ref={remoteVideoContainerRef}
        className="bg-slate-950 w-full aspect-video relative rounded-2xl shadow-inner overflow-hidden border border-slate-800">
        <video
          ref={remoteVideoRef}
          className="w-full h-full object-cover absolute top-0 left-0"
          autoPlay
          playsInline></video>

        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-white bg-slate-900/70 text-xs font-semibold">
          Rahul Kumar (remote)
        </div>

        <button
          onClick={() => toggleFullScreen("remote")}
          title="Maximize"
          className="absolute bottom-3 right-3 w-8 h-8 rounded-lg text-white bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-white/10">
          <i className="ri-fullscreen-line text-sm"></i>
        </button>
      </div>

      {/* SUBSCRIBER STREAM MULTI-PARTICIPANT ROW TRACK */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          ref={localVideoContainerRef}
          className="bg-slate-900 aspect-video rounded-xl relative overflow-hidden border border-slate-800">
          <video
            ref={localVideoRef}
            className="w-full h-full object-cover absolute top-0 left-0"
            autoPlay
            playsInline></video>
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-white bg-slate-950/50 text-[10px] font-medium capitalize">
            {session && session.fullname}
          </div>

          <button
            onClick={() => toggleFullScreen("local")}
            title="Maximize"
            className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-lg text-white bg-black/40 hover:bg-black/60 backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 cursor-pointer border border-white/10">
            <i className="ri-fullscreen-line text-sm"></i>
          </button>
        </div>

        <button
          onClick={() => alert("Open invite modal...")}
          className="group flex flex-col items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-slate-200 aspect-video rounded-xl transition-all hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-100 text-slate-400 group-hover:text-blue-500 flex items-center justify-center transition-colors">
            <i className="ri-user-add-line text-lg"></i>
          </div>
          <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-500 transition-colors">
            Add Participant
          </span>
        </button>
      </div>

      {/* UTILITY MEDIA CALL COMMANDS CONSOLE BAR CONTAINER */}
      <div className="bg-white border border-gray-100 p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleVideo}
            className="bg-gray-100 text-gray-700 w-10 h-10 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
            {isVideoSharing ? (
              <i className="ri-vidicon-line text-base"></i>
            ) : (
              <i className="ri-video-off-line text-base"></i>
            )}
          </button>
          <button
            onClick={toggleMic}
            className="bg-gray-100 text-gray-700 w-10 h-10 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
            {isMuted ? (
              <i className="ri-mic-off-line text-base"></i>
            ) : (
              <i className="ri-mic-line text-base"></i>
            )}
          </button>
          <button
            onClick={toggleScreen}
            className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center cursor-pointer active:scale-95">
            {isScreenSharing ? (
              <i className="ri-chat-off-line text-base"></i>
            ) : (
              <i className="ri-computer-line text-base"></i>
            )}
          </button>
        </div>

        <div className="w-full sm:w-auto">
          {status === "talking" && <label>{getCallDuration(timer)}</label>}
          {(status === "pending" || status === "end") && (
            <Button
              type="success"
              icon="phone-line"
              className="w-full sm:w-auto text-xs py-2 px-4 rounded-xl font-bold justify-center shadow-none h-10"
              onClick={startCall}>
              Start Connection
            </Button>
          )}
          {status === "talking" && (
            <Button
              type="danger"
              icon="close-circle-line"
              className="w-full sm:w-auto text-xs py-2 px-4 rounded-xl font-bold justify-center shadow-none h-10"
              onClick={startCall}>
              End
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={open}
        footer={null}
        centered
        maskClosable
        onCancel={redirectOnCallEnd}>
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Call Ended</h1>
          <Button type="danger">Thank you !</Button>
        </div>
      </Modal>
      {notifyUi}
    </div>
  );
};

export default Video;
