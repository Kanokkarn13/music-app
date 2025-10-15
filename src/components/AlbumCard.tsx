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
    <div className="card bg-base-100 shadow hover:shadow-lg transition">
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

      <div className="card-body p-4">
        <h3 className="card-title text-base leading-snug">{album.title}</h3>
        <p className="text-sm opacity-80">{album.artist}</p>

        <div className="mt-2 flex flex-wrap gap-2 items-center text-xs opacity-70">
          {album.releaseDateLabel && <span>{album.releaseDateLabel}</span>}
        </div>

        
        <div className="card-actions flex justify-between items-center mt-3">
          <button
            type="button"
            onClick={handleFavClick}
            aria-label="toggle album favorite"
            className={`btn btn-sm ${isFav ? "btn-primary" : "btn-outline"}`}
          >
            {isFav ? "★ Favorited" : "☆ Favorite"}
          </button>

          {album.pageUrl ? (
            <a
              className="btn btn-sm btn-outline"
              href={album.pageUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in iTunes
            </a>
          ) : (
            <button className="btn btn-sm" disabled>
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
