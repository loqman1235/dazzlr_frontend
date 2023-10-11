import { BiSolidTrophy, BiSolidCrown } from "react-icons/bi"; // Replace with your icon library
import { Link } from "react-router-dom";
import numeral from "numeral";

const LeaderboardItem = ({ username, points, rank, userHandle, avatar }) => {
  return (
    // bg-white dark:bg-[#0A0E28] border border-[#E5E7EB] dark:border-[#4B5563] shadow-md

    <div
      className={`flex items-center justify-between p-3 rounded-xl hover:bg-[#0A0E28]/5 dark:hover:bg-white/5 transition ${
        rank === 1
          ? "bg-gradient-to-r from-[#1D9AF1] via-[#1D9AF1] to-[#1D9AF1] border border-[#1D9AF1] shadow-sm"
          : ""
      }`}
    >
      {/* Rank */}
      <div className="flex items-center gap-2">
        {/* <h2
          className={`font-bold text-lg dark:text-white text-[#0A0E28] ${
            rank === 1 && "text-white dark:!text-white"
          }`}
        >
          # {rank}
        </h2> */}
        {/* Profile */}
        <div className="flex items-center gap-5">
          <Link to="/" className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </Link>
          {/* Username */}
          <div>
            <Link
              to="/"
              className={`text-[14px] font-bold text-[#0A0E28] ${
                rank === 1 ? "text-white dark:!text-white" : "dark:text-white"
              } flex items-center gap-1 hover:underline`}
            >
              {username}{" "}
              {rank === 1 ? (
                <BiSolidCrown
                  size={16}
                  className={`text-[#FFD700] text-xl  ${
                    rank === 1 && "!text-white dark:!text-white"
                  }`}
                />
              ) : (
                <BiSolidTrophy
                  size={16}
                  className={`text-[#FFD700] text-xl  ${
                    rank === 1 && "!text-white dark:!text-white"
                  }`}
                />
              )}
            </Link>
            <p
              className={`text-sm text-[#536471] dark:text-[#A0A0A0] ${
                rank === 1 && "font-medium text-white/60 dark:text-white/60"
              }`}
            >
              {userHandle}
            </p>
          </div>
        </div>
      </div>
      {/* Points */}
      <div
        className={`text-sm font-bold text-[#0A0E28] dark:text-white ${
          rank === 1 && "text-white dark:!text-white"
        }`}
      >
        {numeral(points).format("0.0a")}
        <span className="text-xs font-normal"> Points</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;
