import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { updateUserInInitialState } from "./authSlice";

export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (userHandler, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userHandler}`
      );
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        return rejectWithValue({ error: "Error fetching user" });
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        userData,
        { withCredentials: true }
      );
      // Update the initial state of user from authSlice
      dispatch(updateUserInInitialState(response.data.user));
      // Update user object in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  userData: null,
  usersData: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUserData: (state) => {
      state.userData = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload.user;
      })
      .addCase(getUserThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userData = payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;
