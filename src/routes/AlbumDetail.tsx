// src/routes/AlbumDetail.tsx (ต่อยอดจากของเดิมที่เราทำให้ไปก่อนหน้า)
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopAlbums } from "../store/albumsSlice";
import { fetchAlbumTracks } from "../store/albumTracksSlice";
import type { Album, Track } from "../types/music";
import { toggleAlbumFavorite } from "../store/favoritesSlice";

function msToMMSS(ms?: number) {
  if (!ms || ms <= 0) return "-";
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { items: albums, status: albumsStatus, error: albumsError } = useSelector((s: RootState) => s.albums);
  const fromLink = (location.state as { album?: Album } | null)?.album;

  const album = useMemo(
    () => fromLink ?? albums.find((a) => a.id?.toString() === id),
    [fromLink, albums, id]
  );

  
  useEffect(() => {
    if (!album && albumsStatus === "idle") {
      dispatch(fetchTopAlbums());
    }
  }, [album, albumsStatus, dispatch]);

  
  const albumTracksState = useSelector((s: RootState) => (id ? s.albumTracks.byAlbumId[id] : undefined));
  const tracks = albumTracksState?.items ?? [];
  const tracksStatus = albumTracksState?.status ?? "idle";
  const tracksError = albumTracksState?.error;

  useEffect(() => {
    if (id && tracksStatus === "idle") {
      dispatch(fetchAlbumTracks({ albumId: id }));
    }
  }, [id, tracksStatus, dispatch]);

  const isFav = useSelector((s: RootState) =>
    album ? s.favorites.albumIds.includes(String(album.id)) : false
  );

  if (albumsStatus === "loading" && !album) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  if (albumsStatus === "failed" && !album) return <div className="p-6 text-error">{albumsError}</div>;
  if (!album) return <div className="p-6">Not found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/albums">Top Albums</Link></li>
          <li className="opacity-70">{album.title}</li>
        </ul>
      </div>

      {/* head */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[420px] rounded-2xl overflow-hidden shadow bg-base-200">
          <img src={album.artworkUrl} alt={album.title} loading="lazy" className="w-full h-auto block" />
        </div>

        <div className="space-y-4 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{album.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg opacity-90">{album.artist}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn ${isFav ? "btn-primary" : "btn-outline"}`}
              onClick={() => dispatch(toggleAlbumFavorite(album.id))}
            >
              {isFav ? "★ Favorited" : "☆ Favorite"}
            </button>
            {album.pageUrl && (
              <a className="btn btn-outline" href={album.pageUrl} target="_blank" rel="noreferrer">
                Open in iTunes
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Detail */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Details</h2>
          <div className="grid grid-cols-1 gap-y-3 text-sm">
            <DetailRow label="Title" value={album.title} />
            <DetailRow label="Artist" value={album.artist} />
            <DetailRow label="Category" value={album.category} />
            <DetailRow label="Release Date" value={album.releaseDateLabel} />
            {album.itemCount ? <DetailRow label="Tracks" value={String(album.itemCount)} /> : null}
          </div>
        </div>
      </section>

      {/* show track */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Tracks</h2>

          {tracksStatus === "loading" && (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg" />
            </div>
          )}

          {tracksStatus === "failed" && (
            <div className="alert alert-error">
              <span>{tracksError || "Failed to load tracks"}</span>
            </div>
          )}

          {tracksStatus !== "loading" && tracks.length === 0 && (
            <div className="opacity-70">No tracks found for this album.</div>
          )}

          {tracks.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Title</th>
                    <th className="hidden sm:table-cell">Preview</th>
                    <th className="w-20 text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((t: Track) => (
                    <tr key={t.id}>
                      <td>{t.trackNumber ?? "-"}</td>
                      <td className="align-top">
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs opacity-70">{t.artist}</div>
                      </td>
                      <td className="hidden sm:table-cell">
                        {t.previewUrl ? (
                          <audio controls className="w-56" src={t.previewUrl} />
                        ) : (
                          <span className="opacity-60">—</span>
                        )}
                      </td>
                      <td className="text-right">{msToMMSS(t.durationMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <div className="mt-2 flex flex-wrap gap-2">
        <button className="btn" onClick={() => history.back()}>
          Back
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="opacity-60">{label}</span>
      <span className="font-medium break-words">{value}</span>
    </div>
  );
}
