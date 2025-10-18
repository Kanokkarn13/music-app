// src/components/AlbumCard.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleAlbumFavorite } from "../store/favoritesSlice";
import type { Album } from "../types/music";

export default function AlbumCard({ album }: { album: Album }) {
  const dispatch = useDispatch();
  const isFav = useSelector((s: RootState) =>
    s.favorites.albumIds.includes(String(album.id))
  );

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleAlbumFavorite(album.id));
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition h-full">
      <figure className="aspect-square overflow-hidden">
        {album.artworkUrl ? (
          <img
            src={album.artworkUrl}
            alt={album.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full skeleton" />
        )}
      </figure>

      <div className="card-body p-4 flex flex-col">
        {/* Title 2 lines fixed height */}
        <h3 className="card-title text-base leading-snug line-clamp-2 min-h-[2.75rem]">
          {album.title}
        </h3>

        {/* Artist 1 line */}
        <p className="text-sm opacity-80 line-clamp-1">{album.artist}</p>

        {/* (optional) Release date 1 line */}
        {album.releaseDateLabel && (
          <p className="text-xs opacity-60 line-clamp-1">{album.releaseDateLabel}</p>
        )}

        {/* Actions: ONLY favorite (no Open) pinned bottom to match Song */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={handleFavClick}
            aria-label="toggle album favorite"
            aria-pressed={isFav}
            className={`btn btn-outline btn-sm ${isFav ? "btn-secondary" : ""}`}
          >
            {isFav ? "★ Favorited" : "☆ Favorite"}
          </button>

          {/* เว้นที่ว่างด้านขวาเพื่อบาลานซ์ layout กับ Song */}
          <span className="invisible btn btn-sm btn-outline">Spacer</span>
        </div>
      </div>
    </div>
  );
}
