import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/AuthComponent/Login";
import Home from "./Pages/HomeComponent/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-[#121212] text-white h-screen w-screen">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
