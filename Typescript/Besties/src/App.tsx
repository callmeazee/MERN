import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Layout from "./component/app/Layout";
import Post from "./component/app/Post";
import Friends from "./component/app/Friends";
import Dashboard from "./component/app/Dashboard";




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
        <Route path="friends" element= {<Friends/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
