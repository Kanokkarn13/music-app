// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import MusicDetail from "./routes/MusicDetail";
import Favorites from "./routes/favorites";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4">
        <Routes>
          {/* หน้าแรก */}
          <Route path="/" element={<Home />} />

          {/* รายละเอียดเพลง */}
          <Route path="/tracks/:id" element={<MusicDetail />} />

          {/* หน้ารายการ Favorite */}
          <Route path="/favorites" element={<Favorites />} />

          {/* 404 */}
          <Route
            path="*"
            element={<div className="alert alert-error">Not found</div>}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
