import "./App.css";
//For Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import MyNavBar from "./components/MyNavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateThread from "./pages/CreateThread";
import ThreadDetails from "./pages/ThreadDetails";
import CreateComment from "./pages/CreateComment";

function App() {

  return (
    <div className="App">
      <MyNavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" element={<Login mode="LOGIN"/>} />
        <Route path="/register" element={<Login mode="REGISTER"/>} />
        <Route path="/createThread" element={<CreateThread mode="CREATE"/>} />
        <Route path="/threadDetails" Component={ThreadDetails} />
        <Route path="/updateThread" element={<CreateThread mode="UPDATE"/>} />
        <Route path="/createComment" element={<CreateComment mode="CREATE"/>} />
        <Route path="/updateComment" element={<CreateComment mode="UPDATE"/>} />
      </Routes>        
    </div>
  );
}

export default App;
