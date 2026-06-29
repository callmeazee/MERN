import { useContext, useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

import Context from "../../Context";

import Button from "../shared/Button";
import Card from "../shared/Card";

import CatchError from "../../lib/CatchError";

import useWebRTC from "../../hooks/useWebRTC";
import socket from "../../lib/socket";

const getInitials = (name: string = "") =>
  name
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

const AudioChat = (): JSX.Element | null => {
  const navigate = useNavigate();

  const { session, liveActiveSession,  sdp, setSdp } =
    useContext(Context);

  const [open, setOpen] = useState(false);

  const [isCallStarted, setIsCallStarted] = useState(false);

  const [isSpeakingLocal] = useState(false);

  const [isSpeakingRemote] = useState(false);

  const {
    status,

    micEnabled,

    localAudioRef,

    remoteAudioRef,

    startCall,

    endCall,

    toggleMic,

    cleanup,
    
    receiveRemoteAnswer,

    receiveRemoteCandidate,

    acceptRemoteOffer,

    remoteUser,
  } = useWebRTC({
    mode: "audio",
    session,
  });

  /**
   * ---------------------------------------------------
   * Redirect if user vanished
   * ---------------------------------------------------
   */

  useEffect(() => {
    if (!liveActiveSession) {
      navigate("/app/dashboard");
    }
  }, [liveActiveSession, navigate]);

  /**
   * ---------------------------------------------------
   * Incoming SDP
   * (Temporary until Layout is removed)
   * ---------------------------------------------------
   */

useEffect(() => {
  if (!sdp) return;

  const initializeIncomingCall = async () => {
    try {
      setIsCallStarted(true);

      if (sdp.from) {
        // Remote user is already stored in Layout via liveActiveSession
      }

      await acceptRemoteOffer(sdp.offer);

      setSdp(null);
    } catch (err) {
      CatchError(err);
    }
  };

  initializeIncomingCall();
}, [sdp, acceptRemoteOffer, setSdp]);

  
  
  
  useEffect(() => {
    const onAnswer = async (payload: { answer: RTCSessionDescriptionInit }) => {
      await receiveRemoteAnswer(payload.answer);
    };

    const onCandidate = async (payload: { candidate: RTCIceCandidateInit }) => {
      await receiveRemoteCandidate(payload.candidate);
    };

    const onEnd = () => {
      cleanup();
      setOpen(true);
      setIsCallStarted(false);
    };

    socket.on("answer", onAnswer);
    socket.on("candidate", onCandidate);
    socket.on("end", onEnd);

    return () => {
      socket.off("answer", onAnswer);
      socket.off("candidate", onCandidate);
      socket.off("end", onEnd);
    };
  }, [receiveRemoteAnswer, receiveRemoteCandidate, cleanup]);
  
  
  
  
  /**
   * ---------------------------------------------------
   * Start Call
   * ---------------------------------------------------
   */

  const handleCallClick = async () => {
    if (!liveActiveSession) return;

    try {
      setIsCallStarted(true);

      await startCall(liveActiveSession);
    } catch (err) {
      CatchError(err);
    }
  };

  /**
   * ---------------------------------------------------
   * End
   * ---------------------------------------------------
   */

  const handleEndCall = () => {
    cleanup();

    endCall();

    setOpen(true);

    setIsCallStarted(false);
  };

  const redirectOnCallEnd = () => {
    setOpen(false);

    navigate("/app/dashboard");
  };

  const participants = [
    {
      name: session?.fullname ?? "You",

      initials: getInitials(session?.fullname),

      image: session?.image ?? "",

      isSpeaking: isSpeakingLocal,

      isLocal: true,
    },

    {
      name: remoteUser?.fullname ?? liveActiveSession?.fullname ?? "Unknown",

      initials: getInitials(
        remoteUser?.fullname ?? liveActiveSession?.fullname,
      ),

      image: remoteUser?.image ?? liveActiveSession?.image ?? "",

      isSpeaking: isSpeakingRemote,

      isLocal: false,
    },
  ];

  return (
    <>
      <audio hidden ref={localAudioRef} muted playsInline />

      <audio hidden ref={remoteAudioRef} autoPlay playsInline />

      {!isCallStarted ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <Card
            title={
              <div className="text-center w-full font-semibold text-slate-700">
                Audio Call
              </div>
            }>
            <div className="flex flex-col items-center gap-5 py-8 px-6">
              <div className="relative p-1.5 rounded-full bg-slate-100 ring-2 ring-slate-200">
                {participants[1].image ? (
                  <img
                    src={participants[1].image}
                    alt={participants[1].name}
                    className="w-28 h-28 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                    {participants[1].initials}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-lg font-semibold text-slate-800 capitalize">
                  {participants[1].name}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {status === "calling" ? "Calling..." : "Ready to connect"}
                </p>
              </div>

              <button
                onClick={handleCallClick}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-emerald-100 transition-all">
                <i className="ri-phone-fill text-2xl" />
              </button>

              <p className="text-xs text-slate-400">Tap to start audio call</p>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {participants.map((user, idx) => (
              <Card
                key={idx}
                title={
                  <div className="text-center w-full font-semibold text-slate-700">
                    {user.name}

                    {user.isLocal && (
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        (You)
                      </span>
                    )}
                  </div>
                }>
                <div className="flex flex-col items-center justify-center py-6">
                  <div
                    className={`relative p-1.5 rounded-full transition-all duration-300 ${
                      user.isSpeaking
                        ? "bg-emerald-500/10 ring-4 ring-emerald-500 animate-pulse"
                        : "bg-slate-100 ring-2 ring-slate-200"
                    }`}>
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                        {user.initials}
                      </div>
                    )}

                    <div
                      className={`absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        user.isSpeaking
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-400 text-white"
                      }`}>
                      <i
                        className={
                          user.isSpeaking
                            ? "ri-mic-line animate-bounce"
                            : "ri-mic-off-line"
                        }
                      />
                    </div>
                  </div>

                  <span
                    className={`text-xs mt-4 font-medium ${
                      user.isSpeaking ? "text-emerald-600" : "text-slate-400"
                    }`}>
                    {user.isSpeaking ? "Speaking..." : "Muted"}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          {/* Bottom Controls */}

          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              {/* Mic */}

              <button
                onClick={toggleMic}
                className={`w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center shadow-md active:scale-95 ${
                  micEnabled
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}>
                <i
                  className={`text-xl ${
                    micEnabled ? "ri-mic-line" : "ri-mic-off-line"
                  }`}
                />
              </button>

              {/* Speaker */}

              <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95">
                <i className="ri-volume-up-line text-xl" />
              </button>

              {/* Status */}

              <div className="hidden md:flex flex-col ml-3">
                <span className="text-xs text-slate-400">Connection</span>

                <span className="text-sm font-semibold capitalize text-slate-700">
                  {status}
                </span>
              </div>
            </div>

            {/* End Call */}

            <div className="w-full sm:w-auto">
              <Button
                onClick={handleEndCall}
                icon="close-circle-fill"
                type="danger"
                className="w-full sm:w-auto justify-center py-3">
                End Call
              </Button>
            </div>
          </div>

          {/* Call Ended */}

          <Modal
            open={open}
            footer={null}
            centered
            destroyOnHidden
            maskClosable={false}
            onCancel={redirectOnCallEnd}>
            <div className="py-4 text-center space-y-5">
              <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <i className="ri-phone-off-line text-4xl" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Call Ended
                </h2>

                <p className="text-slate-500 mt-2">
                  Thanks for using Besties Audio Calling.
                </p>
              </div>

              <Button
                type="primary"
                onClick={redirectOnCallEnd}
                className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default AudioChat;