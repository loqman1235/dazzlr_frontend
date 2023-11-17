import { Link } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import VerifiedBadge from "./common/VerifiedBadge";

const SuggestedProfileItem = ({ username, userHandle, image, isVerified }) => {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={image}
            alt={username}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>
        {/* Username */}
        <div>
          <Link className="text-[14px] font-bold flex items-center gap-1 hover:underline">
            {username}{" "}
            {isVerified && <VerifiedBadge size={"small"} type="personal" />}
          </Link>
          <p className="text-[14px] text-[#536471] dark:text-[#A0A0A0]">
            {userHandle}
          </p>
        </div>
      </div>
      <button className="btn btn-sm btn-secondary">Follow</button>
    </li>
  );
};
export default SuggestedProfileItem;
