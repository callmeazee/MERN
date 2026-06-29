// src/hooks/useWebRTC.ts

import {  useCallback, useEffect, useRef, useState } from "react";
import { notification } from "antd";

import socket from "../lib/socket";
import HttpInterceptor from "../lib/HttpInterceptor";
import CatchError from "../lib/CatchError";

import MediaManager from "../services/MediaManager";
import WebRTCManager from "../services/WebRTCManager";

import type {
  CallMode,
  CallStatus,
  CallUser,


} from "../types/webrtc";



interface UseWebRTCProps {
  mode: CallMode;
  session: CallUser;
}

const useWebRTC = ({ mode, session }: UseWebRTCProps) => {
  //  const [notify, notifyUi] = notification.useNotification();

  /**
   * ============================================================
   * Managers
   * ============================================================
   */

  const media = useRef(new MediaManager());

  const rtc = useRef<WebRTCManager | null>(null);

  const remoteUserRef = useRef<CallUser | null>(null);

  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  /**
   * ============================================================
   * Elements
   * ============================================================
   */

  const localVideoRef = useRef<HTMLVideoElement>(null);

  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const localAudioRef = useRef<HTMLAudioElement>(null);

  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  /**
   * ============================================================
   * Audio
   * ============================================================
   */

  const ringtone = useRef<HTMLAudioElement | null>(null);

  /**
   * ============================================================
   * Timer
   * ============================================================
   */

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  /**
   * ============================================================
   * States
   * ============================================================
   */

  const [status, setStatus] = useState<CallStatus>("idle");

  const [loading, setLoading] = useState(false);

  const [duration, setDuration] = useState(0);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const [remoteUser, setRemoteUser] = useState<CallUser | null>(null);

  const [micEnabled, setMicEnabled] = useState(true);

  const [cameraEnabled, setCameraEnabled] = useState(true);

  /**
   * ============================================================
   * Mount
   * ============================================================
   */

  useEffect(() => {
    ringtone.current = new Audio("/audio/ringtone.mp3");

    ringtone.current.loop = true;

    return () => {
      ringtone.current?.pause();
    };
  }, []);

  /**
   * ============================================================
   * TURN
   * ============================================================
   */

  const getIceServers = useCallback(async () => {
    try {
      const { data } = await HttpInterceptor.get("/video/turn-server");

      return data;
    } catch (err) {
      CatchError(err);

      return [];
    }
  }, []);

  /**
   * ============================================================
   * Timer
   * ============================================================
   */

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    timer.current = null;

    setDuration(0);
  };

  /**
   * ============================================================
   * Sounds
   * ============================================================
   */

  const stopRingtone = () => {
    ringtone.current?.pause();

    if (ringtone.current) {
      ringtone.current.currentTime = 0;
    }
  };

  /**
   * ============================================================
   * Cleanup
   * ============================================================
   */

  const cleanup = useCallback(() => {
    stopTimer();

    stopRingtone();

    notification.destroy("incoming");
    notification.destroy("calling");

    rtc.current?.cleanup();

    rtc.current = null;

    media.current.cleanup();

    remoteUserRef.current = null;
    setRemoteUser(null);

    setLocalStream(null);

    setRemoteStream(null);

    setStatus("idle");

    setLoading(false);

    setDuration(0);

    setMicEnabled(true);

    setCameraEnabled(true);
  }, []);

  /**
   * ============================================================
   * Initialize
   * ============================================================
   */

  const initialize = useCallback(
    async (polite: boolean) => {
      setLoading(true);

      try {
        if (rtc.current) {
          cleanup();
        }
        const iceServers = await getIceServers();

        await media.current.start(mode);

        setLocalStream(media.current.stream);

        rtc.current = new WebRTCManager({
          mode,

          media: media.current,

          iceServers,

          events: {
            onOffer: (offer) => {
              if (!remoteUserRef.current) return;

              socket.emit("offer", {
                offer,

                to: remoteUserRef.current.socketId,

                from: sessionRef.current,

                type: mode,
              });
            },

            onAnswer: (answer) => {
              if (!remoteUserRef.current) return;

              socket.emit("answer", {
                answer,

                to: remoteUserRef.current.socketId,
              });
            },

            onCandidate: (candidate) => {
              if (!remoteUserRef.current) return;

              socket.emit("candidate", {
                candidate,

                to: remoteUserRef.current.socketId,
              });
            },

            onRemoteStream: (stream) => {
              setRemoteStream(stream);

              if (mode === "video") {
                if (remoteVideoRef.current) {
                  rtc.current?.attachRemoteStream(
                    remoteVideoRef.current,
                    stream,
                  );
                }
              } else {
                if (remoteAudioRef.current) {
                  rtc.current?.attachRemoteStream(
                    remoteAudioRef.current,
                    stream,
                  );
                }
              }
            },
            onConnectionStateChange: (state) => {
              switch (state) {
                case "connecting":
                  setStatus("connecting");
                  break;

                case "connected":
                  setStatus("connected");

                  stopRingtone();

                  startTimer();

                  break;

                case "failed":
                  cleanup();

                  break;

                case "disconnected":
                  cleanup();

                  break;

                case "closed":
                  cleanup();

                  break;
              }
            },

            onError: (err) => {
              CatchError(err);
            },
          },
        });

        rtc.current.createPeer(polite);

        if (mode === "video") {
          if (localVideoRef.current) {
            rtc.current.attachLocalStream(localVideoRef.current);
          }
        } else {
          if (localAudioRef.current) {
            rtc.current.attachLocalStream(localAudioRef.current);
          }
        }
      } catch (err) {
        CatchError(err);
      } finally {
        setLoading(false);
      }
    },
    [getIceServers, mode, cleanup],
  );

  /**
   * ============================================================
   * Start Call
   * ============================================================
   */

  const startCall = useCallback(
    async (user: CallUser) => {
      try {
        remoteUserRef.current = user;
        setRemoteUser(user);

        setStatus("calling");

        await initialize(true);
      } catch (err) {
        CatchError(err);
      }
    },
    [initialize, mode],
  );

  /**
   * ============================================================
   * Accept Remote Offer
   * ============================================================
   */

  const acceptRemoteOffer = useCallback(
    async (offer: RTCSessionDescriptionInit) => {
      try {
        if (!rtc.current) {
          await initialize(false);
        }

        await rtc.current?.receiveOffer(offer);

        setStatus("connecting");
      } catch (err) {
        CatchError(err);

        cleanup();
      }
    },
    [initialize, cleanup],
  );

  /**
   * ============================================================
   * Receive Remote Answer
   * ============================================================
   */

  const receiveRemoteAnswer = useCallback(
    async (answer: RTCSessionDescriptionInit) => {
      try {
        if (!rtc.current) return;

        await rtc.current.receiveAnswer(answer);
      } catch (err) {
        CatchError(err);
      }
    },
    [],
  );

  /**
   * ============================================================
   * Receive ICE Candidate
   * ============================================================
   */

  const receiveRemoteCandidate = useCallback(
    async (candidate: RTCIceCandidateInit) => {
      try {
        if (!rtc.current) return;

        await rtc.current.receiveCandidate(candidate);
      } catch (err) {
        CatchError(err);
      }
    },
    [],
  );

  /**
   * ============================================================
   * End Call
   * ============================================================
   */

  const endCall = useCallback(() => {
    if (remoteUserRef.current?.socketId) {
      socket.emit("end", {
        to: remoteUserRef.current?.socketId,
      });
    }

    cleanup();
  }, [remoteUser, cleanup]);

  /**
   * ============================================================
   * Socket : Offer
   * ============================================================
   */

  //   const onOffer = useCallback(
  //     async (payload: OfferPayload) => {
  //       /**
  //        * Busy
  //        */
  //       if (status !== "idle") {
  //         socket.emit("end", {
  //           to: payload.from.socketId,
  //         });

  //         return;
  //       }

  //       setIncomingOffer(payload);

  //       remoteUserRef.current = payload.from;
  //       setRemoteUser(payload.from);

  //       setStatus("incoming");

  //       await playRingtone();

  //       notification.open({
  //         key: "incoming",
  //         message: createElement(
  //           "h1",
  //           { className: "capitalize font-medium" },
  //           payload.from.fullname,
  //         ),
  //         description:
  //           payload.type === "audio"
  //             ? "Incoming Audio Call"
  //             : "Incoming Video Call",
  //         duration: 30,
  //         placement: "bottomRight",
  //         btn: createElement(
  //           "div",
  //           { className: "flex gap-2" },
  //           createElement(
  //             "button",
  //             {
  //               type: "button",
  //                  onClick: { acceptCall },
  //               className:
  //                 "mr-3 w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-green-400 justify-center shadow-none h-10 hover:bg-green-500",
  //             },
  //             "Accept Call",
  //           ),
  //           createElement(
  //             "button",
  //             {
  //               type: "button",
  //               onClick: rejectCall,
  //               className:
  //                 "w-full sm:w-auto text-xs py-2 px-3 rounded-xl font-bold bg-rose-400 justify-center shadow-none h-10 hover:bg-rose-500",
  //             },
  //             "End Call",
  //           ),
  //         ),
  //       });
  //     },
  //     [status, acceptCall, rejectCall],
  //   );

  /**
   * ============================================================
   * Socket : Answer
   * ============================================================
   */

  //   const onAnswer = useCallback(async ({ answer }: AnswerPayload) => {
  //     if (!rtc.current) return;

  //     try {
  //       await rtc.current.receiveAnswer(answer);
  //     } catch (err) {
  //       CatchError(err);
  //     }
  //   }, []);

  /**
   * ============================================================
   * Socket : Candidate
   * ============================================================
   */

  //   const onCandidate = useCallback(async ({ candidate }: CandidatePayload) => {
  //     if (!rtc.current) return;

  //     try {
  //       await rtc.current.receiveCandidate(candidate);
  //     } catch (err) {
  //       CatchError(err);
  //     }
  //   }, []);

  /**
   * ============================================================
   * Socket : End
   * ============================================================
   */

  //   const onEnd = useCallback(() => {
  //     notification.destroy();

  //     cleanup();
  //   }, [cleanup]);

  /**
   * ============================================================
   * Toggle Microphone
   * ============================================================
   */

  const toggleMic = useCallback(() => {
    const enabled = media.current.toggleMic();

    setMicEnabled(enabled);

    return enabled;
  }, []);

  /**
   * ============================================================
   * Toggle Camera
   * ============================================================
   */

  const toggleCamera = useCallback(() => {
    const enabled = media.current.toggleCamera();

    setCameraEnabled(enabled);

    return enabled;
  }, []);

  /**
   * ============================================================
   * Screen Share
   * ============================================================
   */

  const startScreenShare = useCallback(async () => {
    try {
      if (!rtc.current) return;

      const stream = await media.current.startScreen();

      const track = stream.getVideoTracks()[0];

      if (!track) return;

      if (!rtc.current) return;

      await rtc.current.replaceTrack("video", track);

      setLocalStream(stream);

      if (localVideoRef.current) {
        media.current.attach(localVideoRef.current, stream);
      }

      track.onended = async () => {
        const camera = await media.current.startVideo();

        await rtc.current?.replaceTrack("video", camera.getVideoTracks()[0]);

        setLocalStream(camera);

        if (localVideoRef.current) {
          media.current.attach(localVideoRef.current, camera);
        }
      };
    } catch (err) {
      CatchError(err);
    }
  }, []);

  /**
   * ============================================================
   * Leave Page Cleanup
   * ============================================================
   */

  useEffect(() => {
    return () => {
      notification.destroy("incoming");

      notification.destroy("calling");

      cleanup();
    };
  }, [cleanup]);

  /**
   * ============================================================
   * Return
   * ============================================================
   */

  return {
    /**
     * State
     */

    status,
    loading,
    duration,

    localStream,
    remoteStream,

    remoteUser,

    micEnabled,
    cameraEnabled,

    /**
     * Refs
     */

    localVideoRef,
    remoteVideoRef,

    localAudioRef,
    remoteAudioRef,

    /**
     * Actions
     */

        initialize,

    startCall,

    acceptRemoteOffer,

    receiveRemoteAnswer,

    receiveRemoteCandidate,

    endCall,

    toggleMic,

    toggleCamera,

    startScreenShare,

    cleanup,
  };
};;

export default useWebRTC;
