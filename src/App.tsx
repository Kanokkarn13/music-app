import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import MusicDetail from "./routes/MusicDetail";
import Favorites from "./routes/Favorites";
import TopAlbums from "./routes/TopAlbums";
import TopSongs from "./routes/TopSongs";
import AlbumDetail from "./routes/AlbumDetail"; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<TopSongs />} />
          <Route path="/albums" element={<TopAlbums />} />
          <Route path="/albums/:id" element={<AlbumDetail />} /> 
          <Route path="/tracks/:id" element={<MusicDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<div className="alert alert-error">Not found</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
