import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeOwner from "./pages/HomeOwner";
import Admin from "./pages/Admin";
import RoomDetail from "./pages/RoomDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms/:roomId" element={<RoomDetail/>}/>
          <Route path ="/homeowner_page" element = {<HomeOwner/>}/>
          <Route path ="/admin_page" element = {<Admin/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
