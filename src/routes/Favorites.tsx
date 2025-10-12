// src/routes/Favorites.tsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopSongs } from "../store/musicSlice";
import MusicCard from "../components/MusicCard";

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((s: RootState) => s.music);
  const favIds = useSelector((s: RootState) => s.favorites.ids);

  useEffect(() => {
    if (status === "idle" && favIds.length > 0 && items.length === 0) {
      dispatch(fetchTopSongs());
    }
  }, [status, favIds.length, items.length, dispatch]);

  const favTracks = useMemo(
    () => items.filter(t => favIds.includes(String(t.id))),
    [items, favIds]
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

      {favIds.length === 0 && (
        <div className="alert">
          <span>ยังไม่มีเพลงใน Favorite — ลองกด ☆ บนการ์ดเพลงเพื่อบันทึกนะ</span>
        </div>
      )}

      {favIds.length > 0 && favTracks.length === 0 && status === "loading" && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {favTracks.length > 0 && (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {favTracks.map(track => (
            <MusicCard
              key={track.id}
              track={track}
              showPreview={false} // ✅ hide preview
              showLink={false}     // you can still show link button
            />
          ))}
        </div>
      )}
    </div>
  );
}
