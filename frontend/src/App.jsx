import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import EditCloth from "./pages/EditCloth";
import Planner from "./pages/Planner";
import Settings from "./pages/Settings";

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

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/wardrobe"
            element={<Wardrobe />}
          />

          <Route
            path="/upload"
            element={<Upload />}
          />

          <Route
            path="/ai"
            element={<AI />}
          />

          <Route
            path="/edit/:id"
            element={<EditCloth />}
          />

          <Route
            path="/planner"
            element={<Planner />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}