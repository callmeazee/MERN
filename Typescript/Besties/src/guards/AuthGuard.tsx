// import CatchError from "./lib/CatchError";

import { useContext, useEffect } from "react";
import HttpInterceptor from "../lib/HttpInterceptor";
import Context from "../Context";
// import Loader from "./component/shared/Loader";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../component/shared/Loader";
import socket from "../lib/socket";

const AuthGuard = () => {
  const { session, setSession } = useContext(Context);
  const getSession = async () => {
    try {
      const { data } = await HttpInterceptor.get("/auth/session");
      setSession(data);
      socket.connect();
    } catch (err) {
      setSession(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getSession();
    return () => {
      socket.disconnect();
    };
  }, []);

  if (session === null) return <Loader />;
  // return <Loader />;
  if (session === false) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthGuard;
