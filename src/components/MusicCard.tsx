// src/components/MusicCard.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleTrackFavorite } from "../store/favoritesSlice";
import type { Track } from "../types/music";

type Props = {
  track: Track;
  showPreview?: boolean;
  showLink?: boolean;
};

export default function MusicCard({
  track,
  showPreview = true,
  showLink = true,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const favTrackIds = useSelector((s: RootState) => s.favorites.trackIds);
  const isFavorited = favTrackIds.includes(String(track.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleTrackFavorite(track.id));
  };

  return (
    <article className="card bg-base-100 shadow hover:shadow-lg transition h-full">
      <figure className="aspect-square overflow-hidden">
        {track.artworkUrl ? (
          <img
            src={track.artworkUrl}
            alt={track.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full skeleton" />
        )}
      </figure>

      <div className="card-body p-4 flex flex-col">
        {/* Title 2 lines fixed height */}
        <h2 className="card-title text-base leading-snug line-clamp-2 min-h-[2.75rem]">
          {track.title}
        </h2>

        {/* Artist 1 line */}
        <p className="text-sm opacity-80 line-clamp-1">{track.artist}</p>

        {/* Album 1 line (optional) */}
        {track.album && (
          <p className="text-xs opacity-60 line-clamp-1">{track.album}</p>
        )}

        {/* Actions pinned bottom */}
        {(showPreview || showLink) && (
          <div className="mt-2">
            {showPreview && track.previewUrl && (
              <audio controls className="w-full" src={track.previewUrl} />
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-pressed={isFavorited}
            className={`btn btn-outline btn-sm ${isFavorited ? "btn-secondary" : ""}`}
          >
            {isFavorited ? "★ Favorited" : "☆ Favorite"}
          </button>

          {showLink && track.pageUrl && (
            <a
              className="btn btn-sm btn-outline"
              href={track.pageUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
