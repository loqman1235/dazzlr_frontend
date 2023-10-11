import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  return JSON.parse(localStorage.getItem("DarkMode"));
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: getInitialTheme(),
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // Update localStorage
      localStorage.setItem("DarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
