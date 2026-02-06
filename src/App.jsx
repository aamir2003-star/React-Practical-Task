// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterRoutes from "./routes/RegisterRoutes";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/*" element={<RegisterRoutes />} />
      </Routes>
  );
}
