import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const FAV_TRACK_KEY = "fav_track_ids";
const FAV_ALBUM_KEY = "fav_album_ids";

// --- helpers 
const load = (key: string): string[] => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
const save = (key: string, ids: string[]) => {
  localStorage.setItem(key, JSON.stringify(ids));
};

interface FavoritesState {
  trackIds: string[]; 
  albumIds: string[];
}

const initialState: FavoritesState = {
  trackIds: load(FAV_TRACK_KEY),
  albumIds: load(FAV_ALBUM_KEY),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleTrackFavorite: (state, action: PayloadAction<string | number>) => {
      const id = String(action.payload);
      state.trackIds = state.trackIds.includes(id)
        ? state.trackIds.filter((x) => x !== id)
        : [...state.trackIds, id];
      save(FAV_TRACK_KEY, state.trackIds);
    },
    toggleAlbumFavorite: (state, action: PayloadAction<string | number>) => {
      const id = String(action.payload);
      state.albumIds = state.albumIds.includes(id)
        ? state.albumIds.filter((x) => x !== id)
        : [...state.albumIds, id];
      save(FAV_ALBUM_KEY, state.albumIds);
    },
  },
});

export const { toggleTrackFavorite, toggleAlbumFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
