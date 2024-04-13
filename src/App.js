import "./App.css";
import { Login } from "./Pages/Login";
import { SignUp } from './Pages/SignUp';
import {Home} from "./Pages/Home"
import { Login_admin } from './Pages/Login_admin';
import { Dashboard } from './Pages/Dashboard';
import { Routes,Route } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/login" element={<Login_admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
