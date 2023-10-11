import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isFollowed: false,
  isLoading: false,
  isAlreadyFollowed: false,
  error: null,
};

export const followUserThunk = createAsyncThunk(
  "follow/followUser",
  async (followedUserID, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/follow/${followedUserID}`,
        "",
        { withCredentials: true }
      );

      if (response.status === 200) {
        return true;
      } else {
        return rejectWithValue({ error: "Failed to follow user" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const unfollowUserThunk = createAsyncThunk(
  "follow/unfollowUser",
  async (followedUserID, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/unfollow/${followedUserID}`,
        "",
        { withCredentials: true }
      );

      if (response.status === 200) {
        return false;
      } else {
        return rejectWithValue({ error: "Failed to unfollow user" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const isUserAlreadyFollowedThunk = createAsyncThunk(
  "follow/isUserAlreadyFollowed",
  async (userIdToBeChecked, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/is-user-followed/${userIdToBeChecked}`,
        "",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(followUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(followUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFollowed = payload;
      })
      .addCase(followUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(unfollowUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unfollowUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isFollowed = payload;
      })
      .addCase(unfollowUserThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(isUserAlreadyFollowedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(isUserAlreadyFollowedThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAlreadyFollowed = payload;
      })
      .addCase(isUserAlreadyFollowedThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default followSlice.reducer;
