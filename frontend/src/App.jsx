import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Wardrobe from "./pages/Wardrobe";
import Upload from "./pages/Upload";
import AI from "./pages/AI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/ai" element={<AI />} />
      </Routes>
    </BrowserRouter>
  );
}