// src/store/musicSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Track, ItunesTopSongsFeed, RssEntry, RssImage } from "../types/music";


const DEFAULT_LIMIT = 24;
const DEFAULT_COUNTRY = "th";

// Helper
const largestImg = (imgs?: RssImage[]) =>
  imgs && imgs.length ? imgs[imgs.length - 1].label : undefined;


const upscaleArtwork = (url?: string, size = 1000) => {
  if (!url) return url;
  return url.replace(/\/\d+x\d+bb\.(png|jpg)/, `/${size}x${size}bb.jpg`);
};


const asLinkArray = (link: RssEntry["link"]) => (Array.isArray(link) ? link : [link]);

const pageUrl = (entry: RssEntry) =>
  asLinkArray(entry.link).find((l) => l.attributes.rel !== "enclosure")?.attributes.href;

const previewUrl = (entry: RssEntry) =>
  asLinkArray(entry.link).find((l) => l.attributes.rel === "enclosure")?.attributes.href;

type MusicState = {
  items: Track[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};

const initialState: MusicState = {
  items: [],
  status: "idle",
};


export const fetchTopSongs = createAsyncThunk<Track[], void>(
  "music/fetchTopSongs",
  async () => {
    const url = `https://itunes.apple.com/${DEFAULT_COUNTRY}/rss/topsongs/limit=${DEFAULT_LIMIT}/json?_=${Date.now()}`;
    const { data } = await axios.get<ItunesTopSongsFeed>(url, { timeout: 15000 });

    const entries = data.feed.entry ?? [];

    return entries.map<Track>((e) => {
      const small = largestImg(e["im:image"]);
      const hi = upscaleArtwork(small, 1000) ?? small;

      const priceAmount = e["im:price"]?.attributes.amount
        ? Number(e["im:price"]!.attributes.amount)
        : undefined;

      return {
        // main
        id: e.id.attributes["im:id"],
        title: e["im:name"].label,
        artist: e["im:artist"].label,
        album: e["im:collection"]?.["im:name"]?.label,

        // pic link review
        artworkUrl: hi,
        pageUrl: pageUrl(e),
        previewUrl: previewUrl(e),

        // detail
        artistUrl: e["im:artist"].attributes?.href,
        priceLabel: e["im:price"]?.label,
        priceAmount,
        currency: e["im:price"]?.attributes.currency,
        categoryId: e.category?.attributes["im:id"],
        category: e.category?.attributes.label,
        releaseDate: e["im:releaseDate"]?.label,                 
        releaseDateLabel: e["im:releaseDate"]?.attributes.label, 
      };
    });
  }
);

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    reset: (s) => Object.assign(s, initialState),
  },
  extraReducers: (b) => {
    b.addCase(fetchTopSongs.pending, (s) => {
      s.status = "loading";
      s.error = undefined;
    })
      .addCase(fetchTopSongs.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchTopSongs.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Fetch failed";
      });
  },
});

export const { reset } = musicSlice.actions;
export default musicSlice.reducer;
