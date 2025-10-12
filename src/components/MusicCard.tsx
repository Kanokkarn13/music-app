// src/components/MusicCard.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleFavorite } from "../store/favoritesSlice";
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
  const favoriteIds = useSelector((s: RootState) => s.favorites.ids);
  const isFavorited = favoriteIds.includes(String(track.id));

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ Prevent click from triggering navigation
    e.preventDefault();  // ✅ Prevent link default behavior (if inside <Link>)
    dispatch(toggleFavorite(track.id));
  };

  return (
    <article className="card bg-base-100 shadow hover:shadow-lg transition">
      <figure className="aspect-square overflow-hidden">
        {track.artworkUrl ? (
          <img
            src={track.artworkUrl}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full skeleton" />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title line-clamp-2">{track.title}</h2>
        <p className="opacity-70">{track.artist}</p>
        {track.album && <p className="text-sm opacity-60">{track.album}</p>}

        {(showPreview || showLink) && (
          <div className="card-actions mt-2 items-center gap-2">
            {showPreview && track.previewUrl && (
              <audio controls className="w-full" src={track.previewUrl} />
            )}
            {showLink && track.pageUrl && (
              <a
                className="btn btn-sm btn-outline ml-auto"
                href={track.pageUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`btn btn-outline btn-sm mt-3 ${
            isFavorited ? "btn-secondary" : ""
          }`}
        >
          {isFavorited ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
    </article>
  );
}
