import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SettingsPage from "./pages/SettingsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import FollowingPage from "./pages/FollowingPage";
import FollowersPage from "./pages/FollowersPage";

const App = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/login" element={<Navigate to="/" />} />
          <Route index path="/register" element={<Navigate to="/" />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path="/" element={<AppLayout />}>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/profile" element={<ProfileSettingsPage />} />
            <Route index path="/home" element={<HomePage />} />
            <Route path="/:userHandler" element={<ProfilePage />} />
            <Route path="/:userHandler/following" element={<FollowingPage />} />
            <Route path="/:userHandler/followers" element={<FollowersPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route index path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};
export default App;
