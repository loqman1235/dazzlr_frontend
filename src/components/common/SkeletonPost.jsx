import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  BiUpvote,
  BiDownvote,
  BiComment,
  BiShare,
  BiDotsHorizontalRounded,
  BiSolidDownvote,
} from "react-icons/bi";
import { useSelector } from "react-redux";

const SkeletonPost = () => {
  const { isDarkMode } = useSelector((state) => state.theme);
  return (
    <div className="p-5 flex gap-4 items-start border-b-black/10 border-b-[0.1px] hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer dark:border-b-[#f3f5f726]">
      {/* Avatar */}
      <Skeleton
        baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
        highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
        className="w-10 h-10 rounded-full"
      />
      {/* Post Details */}
      <div className="flex flex-col items-start gap-2 flex-1">
        {/* Post header */}
        <div className="flex items-center justify-between w-full">
          {/* username */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Skeleton
                baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
                highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
                width={120}
              />
              <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                <Skeleton
                  baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
                  highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
                  width={60}
                />
                <Skeleton
                  baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
                  highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
                  width={80}
                  className="rounded-full"
                />
                <span className="text-xs">&#x2022;</span>
                <Skeleton
                  baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
                  highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
                  width={30}
                />
              </span>
            </div>
          </div>
          <button className="post-btn hover:bg-teal-400/10 hover:text-teal-400">
            <BiDotsHorizontalRounded size={20} />
          </button>
        </div>

        {/* Post Content */}
        <span className="text-[15px] leading-6 w-full">
          <Skeleton
            baseColor={isDarkMode ? "#1a1a1a" : "#E0E0E0"}
            highlightColor={isDarkMode ? "#262626" : "#F5F5F5"}
            count={4}
          />
        </span>

        {/* Post CTAs */}
        {/* <div className="w-full flex items-center justify-between mt-5">
          <button className="post-btn hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]">
            <BiUpvote size={20} />
          </button>
          <button
            className={`post-btn hover:bg-[#f91880]/10 hover:text-[#F44336] 
            `}
          >
            <BiDownvote size={20} />
          </button>
          <button className="post-btn hover:bg-teal-400/10 hover:text-teal-400">
            <BiComment size={20} />
          </button>
          <button className="post-btn hover:bg-teal-400/10 hover:text-teal-400">
            <BiShare size={20} />
          </button>
        </div> */}
      </div>
    </div>
  );
};
export default SkeletonPost;
