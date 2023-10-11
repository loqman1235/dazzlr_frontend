import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userDetails: null,
  isLoading: false,
  error: null,
};

// Get user
export const getUserAsync = createAsyncThunk(
  "profile/getUser",
  async (userHandler, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userHandler}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, { payload }) => {
        state.userDetails = payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserAsync.rejected, (state, { payload }) => {
        state.userDetails = null;
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default profileSlice.reducer;
