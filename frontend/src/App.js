import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeOwner from "./pages/HomeOwner/HomeOwner";
import Admin from "./pages/Admin/Admin";
import RoomDetail from "./pages/RoomDetail";
import Me from "./pages/Me/Me";
import ManageRoom from "./pages/HomeOwner/ManageRoom";
import EditRoom from "./pages/HomeOwner/EditRoom";
import TestAdd from "./pages/HomeOwner/TestAdd";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me" element={<Me />} />
          <Route path="/rooms/:roomId" element={<RoomDetail/>}/>
          {/* HomeOwner ROUTES */}
          <Route path ="/homeowner_home" element = {<HomeOwner/>}/>
          <Route path ="/manage_room" element = {<ManageRoom/>}/>
          <Route path ="/manage_room/edit_room/:roomId" element = {<EditRoom/>}/>

          {/* Admin ROUTES */}
          <Route path ="/admin_home" element = {<Admin/>}/>
          {/* TEST ROUTE */}
          <Route path ="/test" element = {<TestAdd/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
