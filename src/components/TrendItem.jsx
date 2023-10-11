import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const TrendItem = ({ hashtag, posts }) => {
  return (
    <li className="flex items-center justify-between">
      <div>
        <Link to="/" className="text-sm font-bold hover:underline">
          {hashtag}
        </Link>
        <p className="text-[14px] text-[#536471] dark:text-[#A0A0A0]">
          {posts} posts
        </p>
      </div>
      <button className="dropdown-btn">
        <BiDotsHorizontalRounded size={20} />
      </button>
    </li>
  );
};
export default TrendItem;
