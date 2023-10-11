import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import RightSidebar from "../components/RightSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  const toastStyle = isDarkMode ? "dark-toast" : "light-toast";

  return (
    <div className="w-full">
      {/* <Navbar /> */}

      <Menu />
      <div className="flex w-[calc(100%-80px)] ml-[80px] md:w-[calc(100%-280px)] md:ml-[280px]">
        <Outlet />
        <RightSidebar />
      </div>
      <ToastContainer />
    </div>
  );
};
export default AppLayout;
