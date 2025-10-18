// src/routes/Home.tsx
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
  const {
    items: songs,
    status: songsStatus,
    error: songsError,
  } = useSelector((s: RootState) => s.music);
  const {
    items: albums,
    status: albumsStatus,
    error: albumsError,
  } = useSelector((s: RootState) => s.albums);

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
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* ===== Top Songs ===== */}
      <section aria-labelledby="sec-songs">
        <div className="card bg-base-100 shadow">
          <div className="card-body p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-base-200 p-2">
                  
                  <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-80">
                    <path fill="currentColor" d="M12 3v10.55A4 4 0 1 1 10 17V7h8V3h-6Z" />
                  </svg>
                </div>
                <div>
                  <h2 id="sec-songs" className="text-xl sm:text-2xl font-bold">
                    Top Songs
                  </h2>
                  <p className="text-xs sm:text-sm opacity-70">
                    Trending tracks from iTunes (Thailand)
                  </p>
                </div>
              </div>

              <Link to="/songs" className="btn btn-sm btn-outline whitespace-nowrap">
                View all
              </Link>
            </div>

            <div className="divider my-4" />

            {/* Grid */}
            {songs.length === 0 ? (
              <div className="text-center opacity-70 p-10">No music found.</div>
            ) : (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {songs.slice(0, 8).map((t) => (
                  <Link
                    key={t.id}
                    to={`/tracks/${t.id}`}
                    state={{ track: t }}
                    className="block h-full"
                  >
                    <MusicCard track={t} showPreview={false} showLink={false} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      
      <section aria-labelledby="sec-albums">
        <div className="card bg-base-100 shadow">
          <div className="card-body p-5 sm:p-6">
            {/* header */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-base-200 p-2">
                  {/* icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-80">
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 11a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 id="sec-albums" className="text-xl sm:text-2xl font-bold">
                    Top Albums
                  </h2>
                  <p className="text-xs sm:text-sm opacity-70">
                    Most popular albums right now
                  </p>
                </div>
              </div>

              <Link to="/albums" className="btn btn-sm btn-outline whitespace-nowrap">
                View all
              </Link>
            </div>

            <div className="divider my-4" />

            
            {albums.length === 0 ? (
              <div className="text-center opacity-70 p-10">No albums found.</div>
            ) : (
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {albums.slice(0, 8).map((a) => (
                  <Link
                    key={a.id}
                    to={`/albums/${a.id}`}
                    state={{ album: a }}
                    className="block h-full"
                  >
                    <AlbumCard album={a} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
