import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopSongs } from "../store/musicSlice";
import MusicCard from "../components/MusicCard";
import { Link } from "react-router-dom";

export default function TopSongs() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((s: RootState) => s.music);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTopSongs());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  if (status === "failed") return <div className="p-6 text-error">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="opacity-70">Top Songs</li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold">Top Songs</h1>

      {items.length === 0 ? (
        <div className="text-center opacity-70 p-10">No music found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((t) => (
            <Link key={t.id} to={`/tracks/${t.id}`} state={{ track: t }} className="block">
              <MusicCard track={t} showPreview={false} showLink={false} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
