import { Link } from "react-router-dom";
import TrendItem from "./TrendItem";
import LeaderboardItem from "./LeaderboardItem";

const leaderboardData = [
  {
    username: "Axel Djefafla",
    userHandle: "@axeldjefafla",
    avatar: "https://avatarfiles.alphacoders.com/793/79317.png",
    rank: 1,
    points: 10508985,
  },
  {
    username: "Elon Musk",
    userHandle: "@elonmusk",
    avatar:
      "https://i.pinimg.com/736x/18/fd/64/18fd644e9cdf81ab785d606584a384fb.jpg",
    rank: 2,
    points: 5250000,
  },
  {
    username: "Pewdiepie",
    userHandle: "@pewdiepie",
    avatar:
      "https://yt3.googleusercontent.com/5oUY3tashyxfqsjO5SGhjT4dus8FkN9CsAHwXWISFrdPYii1FudD4ICtLfuCw6-THJsJbgoY=s900-c-k-c0x00ffffff-no-rj",
    rank: 3,
    points: 4880589,
  },
  {
    username: "Tech Geek101",
    userHandle: "@techgeek101",
    avatar:
      "https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1387900612/image_1387900612.jpg?io=getty-c-w750",
    rank: 4,
    points: 800587,
  },
  {
    username: "Kylie Jenner",
    userHandle: "@kyliejenner",
    avatar:
      "https://pbs.twimg.com/profile_images/1644389545839071232/xb7h4KwD_400x400.jpg",
    rank: 5,
    points: 50059,
  },
];

const Leaderboard = () => {
  return (
    <div className="mb-10 bg-[#F6F9F8] dark:bg-white/5 p-5 rounded-2xl">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-5">
        <h3 className="font-bold text-xl">Top Achievers</h3>
        <Link
          to="/leaderboard"
          className="text-[14px] text-[#1D9AF1] hover:underline"
        >
          View All
        </Link>
      </div>
      {/* Trends */}
      <ul className="flex flex-col gap-4">
        {leaderboardData.map((data, index) => (
          <LeaderboardItem key={index} {...data} />
        ))}
      </ul>
    </div>
  );
};
export default Leaderboard;
