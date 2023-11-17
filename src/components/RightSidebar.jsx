import { Link } from "react-router-dom";
import Trends from "../components/Trends";
import Footer from "../components/Footer";
import SuggestedProfiles from "../components/SuggestedProfiles";
import Leaderboard from "./Leaderboard";

const RightSidebar = () => {
  return (
    <div className="w-[40%] h-auto border-l-black/10 dark:border-l-white/10 border-l-[0.1px] hidden md:block">
      <div className="p-5 sticky top-0">
        {/* <Leaderboard /> */}
        <Trends />
        <SuggestedProfiles />
        <Footer />
      </div>
    </div>
  );
};
export default RightSidebar;
