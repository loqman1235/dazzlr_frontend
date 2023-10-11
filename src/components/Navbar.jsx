import { Link } from "react-router-dom";
import Brand from "../components/common/Brand";
import ThemeToggle from "./common/ThemeToggle";

const Navbar = () => {
  return (
    <div className="w-full h-16 border-b-[0.1px] border-b-black/10 dark:border-b-white/10 fixed top-0 z-50 px-10 flex items-center justify-between bg-[#FEFFFE]/80 dark:bg-[#0A0E28]/80 backdrop-blur-md">
      {/* Brand */}
      <Brand />

      {/* Profile */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-10 h-10 rounded-full bg-white/20 cursor-pointer overflow-hidden">
          <img
            src="https://cdn.leonardo.ai/users/497b35d5-f65d-4e68-89fc-371ef0d2de7e/generations/6111fc7e-b8fd-4b6b-8cf7-5e8bfbbce2c8/Leonardo_Diffusion_A_beautiful_emotional_image_of_an_android_A_0.jpg"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
