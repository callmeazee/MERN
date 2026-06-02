import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Layout from "./component/app/Layout";
import Post from "./component/app/Post";
import Friends from "./component/app/Friends";
import Dashboard from "./component/app/Dashboard";
<<<<<<< HEAD
import Video from "./component/app/Video";
import Audio from "./component/app/Audio";
import Chat from "./component/app/Chat";
=======
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c




const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/> }/>
        <Route path="/login" element= {<Login/>} />
        <Route path="/signup" element= {<Signup/>} />
        <Route path="/app" element={<Layout />} >
        <Route path="dashboard" element= {<Dashboard/>} />
        <Route path="posts" element= {<Post/>} />
<<<<<<< HEAD
          <Route path="friends" element={<Friends />} />
          <Route path="video" element= {<Video/>} />
          <Route path="audio" element= {<Audio/>} />
          <Route path="chat" element= {<Chat/>} />
=======
        <Route path="friends" element= {<Friends/>} />
>>>>>>> 5bd81a0147ea49d7eec167c715d487e64a47739c
        </Route>
    </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
