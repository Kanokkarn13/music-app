import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Album } from "../types/music";


const DEFAULT_LIMIT = 24;
const DEFAULT_COUNTRY = "th";

// helper
type RssImage = { label: string };
type RssLink = { attributes: { href: string; rel: string } };
type RssEntry = {
  id: { attributes: { "im:id": string } };
  title: { label: string };
  category?: { attributes: { label: string; "im:id": string } };
  link: RssLink | RssLink[];
  "im:image"?: RssImage[];
  "im:artist": { label: string };
  "im:releaseDate"?: { label: string; attributes: { label: string } };
  "im:itemCount"?: { label: string };
};

type ItunesTopAlbumsFeed = {
  feed: { entry?: RssEntry[] };
};

const largestImg = (imgs?: RssImage[]) =>
  imgs && imgs.length ? imgs[imgs.length - 1].label : undefined;

const upscaleArtwork = (url?: string, size = 1000) => {
  if (!url) return url;
  return url.replace(/\/\d+x\d+bb\.(png|jpg)/, `/${size}x${size}bb.jpg`);
};

const asLinkArray = (link: RssEntry["link"]) => (Array.isArray(link) ? link : [link]);
const pageUrl = (entry: RssEntry) =>
  asLinkArray(entry.link).find((l) => l.attributes.rel !== "enclosure")?.attributes.href;

// ============================
type AlbumsState = {
  items: Album[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};

const initialState: AlbumsState = {
  items: [],
  status: "idle",
};

// +++++++++++++++++++++++++++
export const fetchTopAlbums = createAsyncThunk<Album[], void>(
  "albums/fetchTopAlbums",
  async () => {
    const url = `https://itunes.apple.com/${DEFAULT_COUNTRY}/rss/topalbums/limit=${DEFAULT_LIMIT}/json?_=${Date.now()}`;
    const { data } = await axios.get<ItunesTopAlbumsFeed>(url, { timeout: 15000 });

    const entries = data.feed.entry ?? [];

    return entries.map<Album>((e) => {
      const small = largestImg(e["im:image"]);
      const hi = upscaleArtwork(small, 1000) ?? small;

      return {
        id: e.id.attributes["im:id"],
        title: e.title.label,
        artist: e["im:artist"].label,
        artworkUrl: hi,
        pageUrl: pageUrl(e),
        releaseDate: e["im:releaseDate"]?.label,
        releaseDateLabel: e["im:releaseDate"]?.attributes.label,
        categoryId: e.category?.attributes["im:id"],
        category: e.category?.attributes.label,
        itemCount: e["im:itemCount"] ? Number(e["im:itemCount"].label) : undefined,
      };
    });
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    reset: (s) => Object.assign(s, initialState),
  },
  extraReducers: (b) => {
    b.addCase(fetchTopAlbums.pending, (s) => {
      s.status = "loading";
      s.error = undefined;
    })
      .addCase(fetchTopAlbums.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchTopAlbums.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Fetch failed";
      });
  },
});

export const { reset } = albumsSlice.actions;
export default albumsSlice.reducer;
