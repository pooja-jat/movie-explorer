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
  async ({ genres }, thunkAPI) => {
    try {
      const objParam = {};

      if (genres.length > 0) {
        objParam.genres = genres.join(",");
      }

      const res = await axios.get(`https://api.imdbapi.dev/titles`, {
        params: objParam,
      });
      return res?.data?.titles;
    } catch (error) {
      const meaasge = error.response.data.meaasge || "";
      return thunkAPI.rejectWithValue(meaasge);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "GET/ALL_MOVIES",
  async ({ searchText }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://api.imdbapi.dev/search/titles?query=${searchText}`
      );
      console.log(res);
      return res?.data?.titles;
    } catch (error) {
      const meaasge = error.response.data.meaasge || "";
      return thunkAPI.rejectWithValue(meaasge);
    }
  }
);

export default moviesSlice.reducer;
