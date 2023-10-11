import { Link } from "react-router-dom";
import TrendItem from "./TrendItem";

const trendsData = [
  { hashtag: "#Gaming", posts: "150k" },
  { hashtag: "#RandomThoughts", posts: "140.5k" },
  { hashtag: "#TravelDiaries", posts: "36.5k" },
  { hashtag: "#ThrowbackThursday", posts: "28k" },
  { hashtag: "#NatureLovers", posts: "22.5k" },
];

const Trends = () => {
  return (
    <div className="mb-10 bg-[#F6F9F8] dark:bg-white/5 p-5 rounded-2xl">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-5">
        <h3 className="font-bold text-xl">Trending</h3>
        <Link
          to="/discover"
          className="text-[14px] text-[#1D9AF1] hover:underline"
        >
          View All
        </Link>
      </div>
      {/* Trends */}
      <ul className="flex flex-col gap-4">
        {trendsData.map((data, index) => (
          <TrendItem key={index} {...data} />
        ))}
      </ul>
    </div>
  );
};
export default Trends;
