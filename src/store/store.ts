// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicSlice";
import albumsReducer from "./albumsSlice";
import favoritesReducer from "./favoritesSlice";
import albumTracksReducer from "./albumTracksSlice"; 

export const store = configureStore({
  reducer: {
    music: musicReducer,
    albums: albumsReducer,
    favorites: favoritesReducer,
    albumTracks: albumTracksReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
