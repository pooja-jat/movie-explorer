import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    isSuccess: false,
    isErrror: false,
    meaasge: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.meaasge = action.error.message || "Something went wrong";
      });
  },
});

export const fetchAllMovies = createAsyncThunk(
  "GET/ALL_MOVIES",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=04c35731a5ee918f014970082a0088b1&page=1`
      );
      return res?.data?.results;
    } catch (error) {
      const meaasge = error.response.data.meaasge || "";
      return thunkAPI.rejectWithValue(meaasge);
    }
  }
);

// moviesSlice.js
export const searchMovies = createAsyncThunk(
  "SEARCH/Movies",
  async (searchTerm = "Avengers", thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?s=${searchTerm}&apikey=04c35731a5ee918f014970082a0088b1`
      );
      return res.data.Search || [];
    } catch (error) {
      const message =
        error.response?.data?.Error || error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export default moviesSlice.reducer;
