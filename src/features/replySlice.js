import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  postReplies: [],
  replyParentPosts: [],
  replyParentPostsLoading: false,
  postRepliesLoading: false,
  error: null,
};

// Create reply thunk
export const createReplyThunk = createAsyncThunk(
  "reply/createReply",
  async (replyContent, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        replyContent,
        { withCredentials: true }
      );
      if (response.status === 201) {
        return response.data.post;
      } else {
        return rejectWithValue({ error: "Error creating reply" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch post replies
export const fetchPostRepliesThunk = createAsyncThunk(
  "reply/fetchPostReplies",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/replies/${postId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        return { postId, replies: response.data.replies };
      } else {
        return rejectWithValue({ error: "Error fetching post replies" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch post replies
export const fetchReplyParentPostsThunk = createAsyncThunk(
  "reply/fetchReplyParentPosts",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/parents/${postId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        return { postId, parentPosts: response.data.parentPosts };
      } else {
        return rejectWithValue({ error: "Error fetching post parent replies" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReplyThunk.pending, (state) => {
        state.postRepliesLoading = true;
      })
      .addCase(createReplyThunk.fulfilled, (state, { payload }) => {
        state.postRepliesLoading = false;
        // const { postId, reply } = payload;
        // state.postReplies[postId].unshift(reply);
      })
      .addCase(createReplyThunk.rejected, (state, { payload }) => {
        state.postRepliesLoading = false;
      })
      .addCase(fetchPostRepliesThunk.pending, (state) => {
        state.postRepliesLoading = true;
      })
      .addCase(fetchPostRepliesThunk.fulfilled, (state, { payload }) => {
        state.postRepliesLoading = false;
        const { postId, replies } = payload;
        state.postReplies[postId] = replies;
      })
      .addCase(fetchPostRepliesThunk.rejected, (state, { payload }) => {
        state.postRepliesLoading = false;
        state.error = payload;
      })

      .addCase(fetchReplyParentPostsThunk.pending, (state) => {
        state.replyParentPostsLoading = true;
      })
      .addCase(fetchReplyParentPostsThunk.fulfilled, (state, { payload }) => {
        state.replyParentPostsLoading = false;
        const { postId, parentPosts } = payload;
        state.replyParentPosts[postId] = parentPosts;
      })
      .addCase(fetchReplyParentPostsThunk.rejected, (state, { payload }) => {
        state.replyParentPostsLoading = false;
        state.error = payload;
      });
  },
});

export default replySlice.reducer;
