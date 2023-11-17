import { Link, useParams } from "react-router-dom";
import {
  BiUpvote,
  BiDownvote,
  BiComment,
  BiShare,
  BiDotsHorizontalRounded,
  BiSolidDownvote,
} from "react-icons/bi";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import VerifiedBadge from "./common/VerifiedBadge";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeAgo from "react-timeago";
import axios from "axios";
import CreateReply from "./CreateReply";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ReplyBox = ({ _id, user, createdAt, content }) => {
  const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(likes.length);
  const [isReplyModelHidden, setIsReplyModelHidden] = useState(true);
  const [postRepliesCounter, setPostRepliesCounter] = useState(0);
  const { userHandler: posterHandler } = useParams();

  // const handleReplyModel = () => {
  //   setIsReplyModelHidden(!isReplyModelHidden);
  // };

  return (
    <>
      <div className="w-full" id="reply">
        <div className="flex gap-5 mb-5">
          <div className="flex items-center flex-col gap-1">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
              <img
                src={user?.avatar?.url}
                alt={`${user?.fullname}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Line */}
            <div className="avatar_line w-[2px] h-[calc(100%-40px)] dark:bg-[#333638] bg-black/20 rounded-full"></div>
          </div>
          <div>
            {/* User details */}
            <div className="mb-2">
              <div className="flex items-center gap-1">
                <Link
                  to={`/${user?.userHandler}`}
                  className="text-[15px] font-bold "
                >
                  {user?.fullname}
                </Link>
                <span>
                  {user?.isVerified && (
                    <VerifiedBadge size="small" type={user?.accountType} />
                  )}
                </span>
              </div>
              <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                {user?.userHandler}
                <span className="text-xs">&#x2022;</span>
                <TimeAgo date={createdAt} />
              </span>
            </div>
            <p className="text-[15px] leading-6 mb-4">{content}</p>
            {/* Reply CTAs */}
            <div
              className="w-full flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center gap-px"
                title={
                  postRepliesCounter === 1
                    ? postRepliesCounter + " reply"
                    : postRepliesCounter + " replies"
                }
              >
                <button className="post-btn dark:hover:text-white hover:text-[#101010]">
                  <ChatBubbleOvalLeftIcon className="w-5 h-5 stroke-2" />
                </button>
              </div>
              <div className="flex items-center gap-px">
                <button className="post-btn dark:hover:text-white hover:text-[#101010]">
                  <HeartIcon
                    className={`w-5 h-5 stroke-2 ${
                      isLiked && "fill-[#D33F49] stroke-[#D33F49]"
                    }`}
                  />
                </button>
              </div>
              <button className="post-btn dark:hover:text-white hover:text-[#101010]">
                <ArrowPathRoundedSquareIcon className="w-5 h-5 stroke-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply modal */}
      {/* <div
        className={`p-5 shadow-2xl inset-0 w-full h-screen bg-black/50 dark:bg-white/50 fixed top-0 left-0 z-50 backdrop-blur items-center justify-center ${
          isReplyModelHidden ? "hidden" : "flex"
        }`}
        onClick={handleReplyModel}
      >
        <div
          className="w-[600px] bg-[#FEFFFE] dark:bg-[#101010] rounded-2xl p-5 flex flex-col items-start gap-5"
          onClick={(e) => e.stopPropagation()}
          id="modalBox"
        >
       
 
        </div>
      </div> */}
    </>
  );
};
export default ReplyBox;
