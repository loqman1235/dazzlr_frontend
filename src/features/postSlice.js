import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  feed: [],
  userPosts: [],
  status: "idle",
  error: null,
  postModalHidden: true,
};

// Fetch posts by user id thunk
export const fetchPostsAsync = createAsyncThunk(
  "post/fetchPosts",
  async (userHandler, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/${userHandler}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        return rejectWithValue({ error: "No Posts Found" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Create post thunk
export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postContent, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        postContent,
        { withCredentials: true }
      );
      if (response.status === 201) {
        const data = response.data;
        return data;
      } else {
        return rejectWithValue({ error: "Failed creating a post" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchFeedPostsThunk = createAsyncThunk(
  "post/fetchFeedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/feed`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue({ error: "Failed fetching feed" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    toggleCreatePostModal: (state, { payload }) => {
      state.postModalHidden = payload;
    },
    resetUserPosts: (state) => {
      state.userPosts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostsAsync.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.userPosts = payload;
      })
      .addCase(fetchPostsAsync.rejected, (state, { payload }) => {
        state.status = "rejected";
        state.error = payload;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(createPostAsync.fulfilled, (state, { payload }) => {
        state.userPosts.unshift(payload.post);
        state.feed.unshift(payload.post);
      })
      .addCase(createPostAsync.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(fetchFeedPostsThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchFeedPostsThunk.fulfilled, (state, { payload }) => {
        state.status = "fulfilled";
        state.feed = payload;
      })
      .addCase(fetchFeedPostsThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
        state.error = payload;
      });
  },
});

export const { toggleCreatePostModal, resetUserPosts } = postSlice.actions;
export default postSlice.reducer;
