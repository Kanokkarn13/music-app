// src/store/favoritesSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const FAV_KEY = "fav_song_ids"; // renamed for clarity

// --- helpers for localStorage ---
const loadFavoritesFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (ids: string[]) => {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
};

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: loadFavoritesFromStorage(),
};

// --- Slice ---
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string | number>) => {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
      saveFavoritesToStorage(state.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
