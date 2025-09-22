import { configureStore } from "@reduxjs/toolkit";
import movies from "../features/movie/moviesSlice";

const store = configureStore({
  reducer: {
    movies,
  },
});

export default store;
