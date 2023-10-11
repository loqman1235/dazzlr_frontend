import { Link } from "react-router-dom";
import {
  BiUpvote,
  BiDownvote,
  BiComment,
  BiShare,
  BiDotsHorizontalRounded,
  BiSolidDownvote,
} from "react-icons/bi";
import VerifiedBadge from "./common/VerifiedBadge";
import { useState } from "react";
import LevelBadge from "./common/LevelBadge";
import TimeAgo from "react-timeago";

const Post = ({ user, content, hashtags, createdAt, photos }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // May change it later
  const parseHashtags = (content) => {
    const hashtagsRegex = /#(\w+)/g;

    const parsedContent = content.replace(
      hashtagsRegex,
      '<a class="hashtag" href="/hashtags/$1">#$1</a>'
    );

    return { __html: parsedContent };
  };

  return (
    <div className="p-5 flex gap-4 items-start border-b-black/10 border-b-[0.1px] hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer dark:border-b-white/10">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={user?.avatar?.url}
          alt={`${user?.fullname}`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Post Details */}
      <div className="flex flex-col items-start gap-2 flex-1">
        {/* Post header */}
        <div className="flex items-center justify-between w-full">
          {/* username */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link
                to={`/${user?.userHandler}`}
                className="text-[15px] font-bold hover:underline flex items-center gap-1"
              >
                {user?.fullname} {user?.isVerified && <VerifiedBadge />}
              </Link>
              <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                {user?.userHandler}
                {/* {user.points !== undefined && (
                  <LevelBadge points={user?.points} />
                )} */}
                <span className="text-xs">&#x2022;</span>
                <TimeAgo date={createdAt} />
              </span>
            </div>
          </div>
          <button className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]">
            <BiDotsHorizontalRounded size={20} />
          </button>
        </div>

        {/* Post Content */}
        <p
          className="text-[15px] leading-6"
          dangerouslySetInnerHTML={parseHashtags(content)}
        ></p>
        {photos.length > 0 &&
          photos.map((photo, i) => (
            <div className="w-full h-[280px] rounded-md overflow-hidden">
              <img
                key={i}
                src={photo.url}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

        {/* Post CTAs */}
        <div className="w-full flex items-center justify-between mt-5">
          <button className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]">
            <BiUpvote size={20} />
          </button>
          <button
            onClick={handleLike}
            className={`post-btn hover:bg-[#f91880]/10 hover:text-[#F44336] ${
              isLiked && "!text-[#F44336]"
            }`}
          >
            {!isLiked ? (
              <BiDownvote size={20} />
            ) : (
              <BiSolidDownvote size={20} />
            )}
          </button>
          <button className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]">
            <BiComment size={20} />
          </button>
          <button className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]">
            <BiShare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Post;
