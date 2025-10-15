import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchTopSongs } from "../store/musicSlice";
import { fetchTopAlbums } from "../store/albumsSlice";
import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";

export default function Favorites() {
  const dispatch = useDispatch<AppDispatch>();

  // songs
  const { items: songs, status: songsStatus } = useSelector((s: RootState) => s.music);
  // albums
  const { items: albums, status: albumsStatus } = useSelector((s: RootState) => s.albums);

  // favorites
  const { trackIds, albumIds } = useSelector((s: RootState) => s.favorites);

  // โหลดข้อมูลเท่าที่จำเป็น (เฉพาะตอนมี fav ids แต่ยังไม่มี items ใน store)
  useEffect(() => {
    if (songsStatus === "idle" && trackIds.length > 0 && songs.length === 0) {
      dispatch(fetchTopSongs());
    }
  }, [songsStatus, trackIds.length, songs.length, dispatch]);

  useEffect(() => {
    if (albumsStatus === "idle" && albumIds.length > 0 && albums.length === 0) {
      dispatch(fetchTopAlbums());
    }
  }, [albumsStatus, albumIds.length, albums.length, dispatch]);

  const favTracks = useMemo(
    () => songs.filter((t) => trackIds.includes(String(t.id))),
    [songs, trackIds]
  );
  const favAlbums = useMemo(
    () => albums.filter((a) => albumIds.includes(String(a.id))),
    [albums, albumIds]
  );

  const isLoading =
    (trackIds.length > 0 && songsStatus === "loading") ||
    (albumIds.length > 0 && albumsStatus === "loading");

  const isEmptyAll = trackIds.length === 0 && albumIds.length === 0;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">My Favorites</h1>

      {isEmptyAll && (
        <div className="alert">
          <span>
            ยังไม่มีรายการโปรด — ลองกด ☆ ที่การ์ดเพลงหรืออัลบั้มเพื่อบันทึกนะ
          </span>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      )}

      {/* Favorite Songs */}
      {favTracks.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Songs</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {favTracks.map((track) => (
              <MusicCard
                key={track.id}
                track={track}
                showPreview={false}
                showLink={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* Favorite Albums */}
      {favAlbums.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Albums</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {favAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
