import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

const SkeletonProfileDetails = () => {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <div className="w-full">
      {/* Profile Cover */}
      <Skeleton
        baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
        highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
        className="w-full h-[220px] block rounded-none"
      />

      {/* Profile Info */}
      <div className="w-full -mt-24 border-b border-b-black/5 dark:border-b-white/5">
        <div className="p-5">
          {/* Profile Picture */}
          <Skeleton
            baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
            highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
            className="relative z-10 cursor-pointer w-36 h-36 rounded-full border-4 border-[#FEFFFE] dark:border-[#0A0E28] mb-4 overflow-hidden p-[1px]"
          />

          <div className="w-full flex items-center justify-between mb-3">
            {/* Username */}
            <div className="flex flex-col items-start">
              <h3 className="text-xl font-bold flex items-center gap-1">
                <Skeleton
                  baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                  highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                  width={140}
                />{" "}
              </h3>
              <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px]">
                <Skeleton
                  baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                  highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                  width={60}
                />
              </span>
            </div>
            {/* Edit Profile Button */}
            {/* <button className="btn-outline">Edit Profile</button> */}
          </div>
          {/* Number of followers */}
          <div className="flex items-center gap-4 mb-3">
            <Link
              to="/"
              className="flex items-center gap-1 text-[15px] text-[#536471] dark:text-[#A0A0A0] hover:underline"
            >
              <Skeleton
                baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                width={100}
              />
            </Link>

            <Link
              to="/"
              className="flex items-center gap-1 text-[15px] text-[#536471] dark:text-[#A0A0A0] hover:underline"
            >
              <Skeleton
                baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                width={100}
              />
            </Link>
          </div>
          {/* Description */}
          <p className="text-[15px] mb-3">
            <Skeleton
              baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
              highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
              count={3}
            />
          </p>
          {/* info */}
          <ul className="flex items-center gap-5">
            <div className="w-full">
              <Skeleton
                baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Skeleton
                baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Skeleton
                baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
                className="w-full"
              />
            </div>
          </ul>
        </div>

        {/* Tabs */}
        <ul className="w-full flex items-center mt-10">
          <li className="flex-1 relative after:absolute after:w-full after:h-[2px] after:bg-[#1D9AF1] after:bottom-[-1px] after:left-0">
            <Link
              className="text-[15px] hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-center p-4 font-semibold"
              to="/profile"
            >
              Posts
            </Link>
          </li>
          <li className="flex-1">
            <Link
              className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5 hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
              to="/profile"
            >
              Replies
            </Link>
          </li>
          <li className="flex-1">
            <Link
              className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5 hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
              to="/profile"
            >
              Media
            </Link>
          </li>
          <li className="flex-1">
            <Link
              className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5  hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
              to="/profile"
            >
              Likes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SkeletonProfileDetails;
