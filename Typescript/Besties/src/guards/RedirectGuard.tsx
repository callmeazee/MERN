// import CatchError from "./lib/CatchError";

import { useContext, useEffect } from "react";
import HttpInterceptor from "../lib/HttpInterceptor";
import Context from "../Context";
// import Loader from "./component/shared/Loader";
import { Navigate, Outlet } from "react-router-dom";

const RedirectGuard = () => {
  const { session, setSession } = useContext(Context);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await HttpInterceptor.get("/auth/session");
        setSession(data);
      } catch (err) {
        setSession(false);
        console.log(err);
      }
    };
    getSession();
  }, []);

  if (session === null) return null;
  // return <Loader />;
  if (session === false) return <Outlet />;

  return <Navigate to={"/app"} />;
};

export default RedirectGuard;
