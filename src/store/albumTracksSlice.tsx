import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Track } from "../types/music";


type ItunesLookupResponse = { results: any[] };

export const fetchAlbumTracks = createAsyncThunk<
  { albumId: string; tracks: Track[] },
  { albumId: string; country?: string }
>("albumTracks/fetch", async ({ albumId, country = "th" }) => {
  const url = `https://itunes.apple.com/lookup?id=${albumId}&entity=song&country=${country}&_=${Date.now()}`;
  const { data } = await axios.get<ItunesLookupResponse>(url, { timeout: 15000 });

  
  const songs = (data.results ?? []).slice(1);

  const tracks: Track[] = songs.map((r) => ({
    id: String(r.trackId),
    title: r.trackName,
    artist: r.artistName,
    album: r.collectionName,
    artworkUrl: r.artworkUrl100?.replace("100x100bb", "1000x1000bb"),
    pageUrl: r.trackViewUrl,
    previewUrl: r.previewUrl,
    category: r.primaryGenreName,
    releaseDate: r.releaseDate,
    releaseDateLabel: undefined,
    trackNumber: r.trackNumber,
    discNumber: r.discNumber,
    durationMs: r.trackTimeMillis,
  }));

  return { albumId, tracks };
});

type AlbumTracksState = {
  byAlbumId: Record<
    string,
    {
      items: Track[];
      status: "idle" | "loading" | "succeeded" | "failed";
      error?: string;
    }
  >;
};

const initialState: AlbumTracksState = {
  byAlbumId: {},
};

const albumTracksSlice = createSlice({
  name: "albumTracks",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchAlbumTracks.pending, (s, a) => {
      const albumId = a.meta.arg.albumId;
      s.byAlbumId[albumId] = s.byAlbumId[albumId] ?? { items: [], status: "idle" };
      s.byAlbumId[albumId].status = "loading";
      s.byAlbumId[albumId].error = undefined;
    });
    b.addCase(fetchAlbumTracks.fulfilled, (s, a) => {
      const { albumId, tracks } = a.payload;
      s.byAlbumId[albumId] = { items: tracks, status: "succeeded" };
    });
    b.addCase(fetchAlbumTracks.rejected, (s, a) => {
      const albumId = a.meta.arg.albumId;
      s.byAlbumId[albumId] = s.byAlbumId[albumId] ?? { items: [], status: "idle" };
      s.byAlbumId[albumId].status = "failed";
      s.byAlbumId[albumId].error = a.error.message || "Fetch failed";
    });
  },
});

export default albumTracksSlice.reducer;
