import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopSongs } from "../store/musicSlice";
import { fetchTopAlbums } from "../store/albumsSlice";
import { Link } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: songs, status: songsStatus, error: songsError } = useSelector(
    (s: RootState) => s.music
  );
  const { items: albums, status: albumsStatus, error: albumsError } = useSelector(
    (s: RootState) => s.albums
  );

  useEffect(() => {
    dispatch(fetchTopSongs());
    dispatch(fetchTopAlbums());
  }, [dispatch]);

  const loading = songsStatus === "loading" || albumsStatus === "loading";
  const failed = songsStatus === "failed" || albumsStatus === "failed";

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (failed) {
    return (
      <div className="p-6 text-error">
        {songsError || albumsError || "Fetch failed"}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Top Songs */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-bold">Top Songs</h1>
          <Link to="/songs" className="btn btn-sm btn-primary">
            View all
          </Link>
        </div>

        {songs.length === 0 ? (
          <div className="text-center opacity-70 p-10">No music found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {songs.slice(0, 8).map((t) => (   
              <Link
                key={t.id}
                to={`/tracks/${t.id}`}
                state={{ track: t }}
                className="block"
              >
                <MusicCard track={t} showPreview={false} showLink={false} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Top Albums */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">Top Albums</h2>
          <Link to="/albums" className="btn btn-sm btn-primary">
            View all
          </Link>
        </div>

        {albums.length === 0 ? (
          <div className="text-center opacity-70 p-10">No albums found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {albums.slice(0, 8).map((a) => (
              <Link key={a.id} to={`/albums/${a.id}`} state={{ album: a }} className="block">
                <AlbumCard album={a} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
