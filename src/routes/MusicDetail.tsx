// src/routes/MusicDetail.tsx
import { useEffect, useMemo } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopSongs } from "../store/musicSlice";
import type { Track } from "../types/music";
import AudioPreview from "../components/AudioPreview";


export default function MusicDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((s: RootState) => s.music);

  // รับ track จาก Link 
  const fromLink = (location.state as { track?: Track } | null)?.track;

  // หาใน store ตาม id
  const fromStore = useMemo(
    () => items.find((t) => t.id?.toString() === id),
    [items, id]
  );

  const track = fromLink ?? fromStore;

  // ถ้ายังไม่มีข้อมูล ให้โหลด
  useEffect(() => {
    if (!track && status === "idle") {
      dispatch(fetchTopSongs());
    }
  }, [track, status, dispatch]);

  if (status === "loading" && !track) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  if (status === "failed" && !track) return <div className="p-6 text-error">{error}</div>;
  if (!track) return <div className="p-6">Not found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to="/">Top Songs</Link></li>
          <li className="opacity-70">{track.title}</li>
        </ul>
      </div>

      {/* Artwork + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[420px] rounded-2xl overflow-hidden shadow bg-base-200">
          <img
            src={track.artworkUrl}
            alt={track.title}
            loading="lazy"
            className="w-full h-auto block"
          />
        </div>

        <div className="space-y-4 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">{track.title}</h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg opacity-90">{track.artist}</span>
          </div>

          {track.previewUrl && (
            <AudioPreview src={track.previewUrl} title="Preview (30s)" />
            )}


          
        </div>
      </div>

      {/* รายละเอียดเพิ่มเติม */}
      <section className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Details</h2>
          <div className="grid grid-cols-1 gap-y-3 text-sm">
            <DetailRow label="Title" value={track.title} />
            <DetailRow label="Artist" value={track.artist} />
            <DetailRow label="Album" value={track.album} />
            <DetailRow label="Category" value={track.category} />
            <DetailRow label="Release Date" value={track.releaseDateLabel} />
          </div>
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

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="opacity-60">{label}</span>
      <span className="font-medium break-words">{value}</span>
    </div>
  );
}
