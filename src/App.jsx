import { Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";

// Page imports
import AppLayout from "./layouts/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import DirectMessagePage from "./pages/DirectMessagePage";
import LoadingWidget from "./components/common/LoadingWidget";

// Lazy loading pages for performance
const HomePage = lazy(() => import("./pages/HomePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const FollowingPage = lazy(() => import("./pages/FollowingPage"));
const FollowersPage = lazy(() => import("./pages/FollowersPage"));
const PostPage = lazy(() => import("./pages/PostPage"));

const App = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    // Apply dark mode to the document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <Suspense fallback={<LoadingWidget />}>
        {/* Conditional rendering based on authentication status */}
        {isAuth ? (
          <Routes>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route index path="/register" element={<Navigate to="/" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route exact path="/" element={<AppLayout />}>
              <Route path="/messages" element={<MessagesPage />}>
                <Route
                  path="/messages/:convId"
                  element={<DirectMessagePage />}
                />
              </Route>
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/settings/profile"
                element={<ProfileSettingsPage />}
              />
              <Route index path="/home" element={<HomePage />} />
              <Route path="/:userHandler" element={<ProfilePage />} />
              <Route
                path="/:userHandler/posts/:postId"
                element={<PostPage />}
              />

              <Route
                path="/:userHandler/following"
                element={<FollowingPage />}
              />
              <Route
                path="/:userHandler/followers"
                element={<FollowersPage />}
              />
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
      </Suspense>
    </>
  );
};
export default App;
