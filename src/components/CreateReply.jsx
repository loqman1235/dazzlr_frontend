import { Link } from "react-router-dom";
import VerifiedBadge from "./common/VerifiedBadge";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createReplyThunk } from "../features/replySlice";
import ReplyForm from "./ReplyForm";

const CreateReply = ({
  postId,
  user,
  content,
  createdAt,
  setIsReplyModelHidden,
}) => {
  return (
    <div className="w-full">
      <div className="flex gap-5 mb-5">
        <div className="flex items-center flex-col gap-1">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
            <img
              src={user?.avatar?.url}
              alt={`${user?.fullname}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[2px] h-[calc(100%-40px)] dark:bg-[#333638] bg-black/20 rounded-full"></div>
        </div>
        <div>
          {/* User details */}
          <div className="mb-2">
            <div className="flex items-center gap-1">
              <h3 className="text-[15px] font-bold ">{user?.fullname}</h3>
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
          <div className="text-[15px] flex items-center gap-1">
            <p className="text-[#536471] dark:text-[#A0A0A0]">Replying to </p>{" "}
            <Link to={`/${user?.userHandler}`} className="link">
              {user?.userHandler}
            </Link>
          </div>
        </div>
      </div>
      {/* Reply Box */}
      <ReplyForm
        in_reply_to={postId}
        setIsReplyModelHidden={setIsReplyModelHidden}
      />
    </div>
  );
};

export default CreateReply;
