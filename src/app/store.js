import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import postReducer from "../features/postSlice";
import profileReducer from "../features/profileSlice";
import userReducer from "../features/userSlice";
import followReducer from "../features/followSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    post: postReducer,
    profile: profileReducer,
    user: userReducer,
    follow: followReducer,
  },
});

export default store;
