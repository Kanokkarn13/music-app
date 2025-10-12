// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./musicSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    music: musicReducer,
    favorites: favoritesReducer, // ✅ add this line
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
