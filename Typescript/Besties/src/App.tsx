import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Layout from "./component/app/Layout";
import Post from "./component/app/Post";
import Friends from "./component/app/Friends";
import Dashboard from "./component/app/Dashboard";
import Video from "./component/app/Video";
import Audio from "./component/app/Audio";
import Chat from "./component/app/Chat";
import NotFound from "./component/shared/NotFound";
import { ToastContainer } from "react-toastify";
import Context from "./Context";
import { useState } from "react";
import AuthGuard from "./guards/AuthGuard";
import RedirectGuard from "./guards/RedirectGuard";

const App = () => {
  const [session, setSession] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <Context.Provider value={{ session, setSession }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<RedirectGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path="/app" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<Post />} />
              <Route path="friends" element={<Friends />} />
              <Route path="video" element={<Video />} />
              <Route path="audio" element={<Audio />} />
              <Route path="chat" element={<Chat />} />
              {/* <Route path="friends" element={<Friends />} /> */}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
