import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: getStoredUser(),
  isAuth: !!getStoredUser(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  messages: [],
};

// Register
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetAuthState());
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        userData
      );

      if (response.status === 201) {
        const data = response.data;
        return data;
      } else {
        rejectWithValue({ error: "Registration failed" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetAuthState());
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        userData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("user", JSON.stringify(data.user));
        return data;
      } else {
        return rejectWithValue({ error: "Login failed" });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetAuthState());
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        "",
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = response.data;
        localStorage.removeItem("user");
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Reset the auth state (isLoading, isError, messages) before making a new registration attempt
export const resetAuthState = () => (dispatch) => {
  dispatch(authSlice.actions.reset());
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.messages = [];
    },
    updateUserInInitialState: (state, action) => {
      state.user = action.payload; // Update the user in the initial state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
        state.messages = "";
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.messages = "Registration successful";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        if (action.payload) {
          state.isError = true;
          state.isSuccess = false;
          state.messages = action.payload;
        } else {
          state.isSuccess = false;
          state.isError = true;
          state.messages = "Network error";
        }
        state.isLoading = false;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
        state.messages = "";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.isAuth = true;
        state.messages = "Login successful";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        if (action.payload) {
          state.isError = true;
          state.isSuccess = false;
          state.messages = action.payload;
        } else {
          state.isSuccess = false;
          state.isError = true;
          state.messages = "Network error";
        }
        state.isLoading = false;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
        state.isError = false;
        state.messages = "";
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.isAuth = false;
        state.messages = "Logout successful";
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        if (action.payload) {
          state.isError = true;
          state.isSuccess = false;
          state.messages = action.payload;
        } else {
          state.isSuccess = false;
          state.isError = true;
          state.messages = "Network error";
        }
        state.isLoading = false;
      });
  },
});

export const { updateUserInInitialState } = authSlice.actions;
export default authSlice.reducer;
