import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import VerifiedBadge from "./common/VerifiedBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateReply from "./CreateReply";
import ReactTimeAgo from "react-time-ago";

const PostBody = ({ content, photos, fontSize, lineHeight }) => {
  return (
    <div>
      <p
        className={`text-[${fontSize}px] leading-6 mb-4`}
        style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
      >
        {content}
      </p>
      {photos && (
        <div className="w-full">
          {photos.length > 0 &&
            photos.map((photo, i) => (
              <div
                key={i}
                className="w-full h-[280px] rounded-2xl overflow-hidden border border-black/5 dark:border-white/5"
              >
                <img
                  key={i}
                  src={photo.url}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const ParentPost = ({
  user,
  content,
  photos,
  createdAt,
  likes,
  postRepliesCounter,
  handleReplyModel,
  likeCount,
  isLiked,
  handleLike,
  likeAnimation,
}) => {
  return (
    <div className="flex gap-5 mb-5">
      <div className="flex items-center flex-col gap-1">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
          <img
            src={user?.avatar?.url}
            alt={`${user?.fullname}`}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Thread line */}
        <div className="w-[2px] h-[calc(100%-40px)] dark:bg-[#333638] bg-black/20 rounded-full"></div>
      </div>
      <div className="flex-1">
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
            <ReactTimeAgo date={createdAt} timeStyle="twitter" />
          </span>
        </div>
        <PostBody
          content={content}
          photos={photos}
          fontSize={15}
          lineHeight={24}
        />
        {/* Post CTAs */}
        <div
          className="w-full flex items-center gap-2 mt-2"
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
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleReplyModel}
            >
              <ChatBubbleOvalLeftIcon className="w-5 h-5 stroke-2" />
            </button>
            {postRepliesCounter > 0 && (
              <span className="text-sm font-semibold text-[#536471] dark:text-[#A0A0A0]">
                {postRepliesCounter}
              </span>
            )}
          </div>
          <div
            className="flex items-center gap-px overflow-hidden h-[18px]"
            title={likeCount > 1 ? `${likeCount} likes` : `${likeCount} like`}
          >
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleLike}
            >
              <HeartIcon
                className={`w-5 h-5 stroke-2 ${
                  isLiked && "fill-[#D33F49] stroke-[#D33F49]"
                }`}
              />
            </button>
            {likeCount > 0 && (
              <span
                className={`text-sm font-semibold like-count ${likeAnimation} ${
                  isLiked
                    ? "text-[#D33F49]"
                    : "text-[#536471] dark:text-[#A0A0A0]"
                }`}
              >
                {likeCount}
              </span>
            )}
          </div>
          <button className="post-btn dark:hover:text-white hover:text-[#101010]">
            <ArrowPathRoundedSquareIcon className="w-5 h-5 stroke-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SinglePost = ({
  user,
  content,
  photos,
  createdAt,
  likes,
  postRepliesCounter,
  handleReplyModel,
  likeCount,
  isLiked,
  handleLike,
  likeAnimation,
}) => {
  return (
    <div
      className={`px-5 pb-5 flex gap-5 items-start border-b-black/10 border-b-[0.1px] transition  dark:border-b-white/10 `}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={user?.avatar?.url}
          alt={`${user?.fullname}`}
          className="w-full h-full object-cover"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {/* username */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start">
                <Link
                  to={`/${user?.userHandler}`}
                  className="text-[15px] font-bold hover:underline flex items-center gap-1"
                >
                  {user?.fullname}{" "}
                  {user?.isVerified && (
                    <VerifiedBadge size="small" type={user?.accountType} />
                  )}
                </Link>
                <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                  {user?.userHandler}
                  {/* {user.points !== undefined && (
                <LevelBadge points={user?.points} />
              )} */}
                  <span className="text-xs">&#x2022;</span>
                  <ReactTimeAgo date={createdAt} timeStyle="twitter" />
                </span>
              </div>
            </div>
          </div>
          <button className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]">
            <BiDotsHorizontalRounded size={20} />
          </button>
        </div>

        {/* Post Content */}
        <PostBody
          content={content}
          photos={photos}
          fontSize={18}
          lineHeight={28}
        />
        {/* Post CTAs */}
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
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleReplyModel}
            >
              <ChatBubbleOvalLeftIcon className="w-5 h-5 stroke-2" />
            </button>
            {postRepliesCounter > 0 && (
              <span className="text-sm font-semibold text-[#536471] dark:text-[#A0A0A0]">
                {postRepliesCounter}
              </span>
            )}
          </div>
          <div
            className="flex items-center gap-px overflow-hidden h-[18px]"
            title={likeCount > 1 ? `${likeCount} likes` : `${likeCount} like`}
          >
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleLike}
            >
              <HeartIcon
                className={`w-5 h-5 stroke-2 ${
                  isLiked && "fill-[#D33F49] stroke-[#D33F49]"
                }`}
              />
            </button>
            {likeCount > 0 && (
              <span
                className={`text-sm font-semibold like-count ${likeAnimation} ${
                  isLiked
                    ? "text-[#D33F49]"
                    : "text-[#536471] dark:text-[#A0A0A0]"
                }`}
              >
                {likeCount}
              </span>
            )}
          </div>
          <button className="post-btn dark:hover:text-white hover:text-[#101010]">
            <ArrowPathRoundedSquareIcon className="w-5 h-5 stroke-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkPost = ({
  _id,
  user,
  content,
  photos,
  createdAt,
  likes,
  postRepliesCounter,
  handleReplyModel,
  likeCount,
  isLiked,
  handleLike,
  likeAnimation,
}) => {
  return (
    <div
      className={`px-5 pb-5 flex gap-5 items-start border-b-black/10 border-b-[0.1px] transition  dark:border-b-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer p-5`}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <img
          src={user?.avatar?.url}
          alt={`${user?.fullname}`}
          className="w-full h-full object-cover"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex flex-col gap-5 flex-1">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {/* username */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start">
                <Link
                  to={`/${user?.userHandler}`}
                  className="text-[15px] font-bold hover:underline flex items-center gap-1"
                >
                  {user?.fullname}{" "}
                  {user?.isVerified && (
                    <VerifiedBadge size="small" type={user?.accountType} />
                  )}
                </Link>
                <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] flex items-center gap-2">
                  {user?.userHandler}
                  {/* {user.points !== undefined && (
                <LevelBadge points={user?.points} />
              )} */}
                  <span className="text-xs">&#x2022;</span>
                  <ReactTimeAgo date={createdAt} timeStyle="twitter" />
                </span>
              </div>
            </div>
          </div>
          <button
            className="post-btn hover:bg-[#1D9AF1]/10 hover:text-[#1D9AF1]"
            onClick={(e) => e.preventDefault()}
          >
            <BiDotsHorizontalRounded size={20} />
          </button>
        </div>

        {/* Post Content */}
        <Link to={`/${user?.userHandler}/posts/${_id}`}>
          <PostBody
            content={content}
            photos={photos}
            fontSize={15}
            lineHeight={24}
          />
        </Link>
        {/* Post CTAs */}
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
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleReplyModel}
            >
              <ChatBubbleOvalLeftIcon className="w-5 h-5 stroke-2" />
            </button>
            {postRepliesCounter > 0 && (
              <span className="text-sm font-semibold text-[#536471] dark:text-[#A0A0A0]">
                {postRepliesCounter}
              </span>
            )}
          </div>
          <div
            className="flex items-center gap-px overflow-hidden h-[18px]"
            title={likeCount > 1 ? `${likeCount} likes` : `${likeCount} like`}
          >
            <button
              className="post-btn dark:hover:text-white hover:text-[#101010]"
              onClick={handleLike}
            >
              <HeartIcon
                className={`w-5 h-5 stroke-2 ${
                  isLiked && "fill-[#D33F49] stroke-[#D33F49]"
                }`}
              />
            </button>
            {likeCount > 0 && (
              <span
                className={`text-sm font-semibold like-count ${likeAnimation} ${
                  isLiked
                    ? "text-[#D33F49]"
                    : "text-[#536471] dark:text-[#A0A0A0]"
                }`}
              >
                {likeCount}
              </span>
            )}
          </div>
          <button className="post-btn dark:hover:text-white hover:text-[#101010]">
            <ArrowPathRoundedSquareIcon className="w-5 h-5 stroke-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Post = ({
  _id,
  user,
  content,
  hashtags,
  createdAt,
  photos,
  likes,
  isLink = true,
  isReply = false,
  isParent = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [isReplyModelHidden, setIsReplyModelHidden] = useState(true);
  const [postRepliesCounter, setPostRepliesCounter] = useState(0);
  const [likeAnimation, setLikeAnimation] = useState("initial");

  const handleReplyModel = () => {
    setIsReplyModelHidden(!isReplyModelHidden);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/like/${_id}`,
        "",
        { withCredentials: true }
      );

      if (response.status === 200) {
        // setIsLiked(!isLiked);
        // setLikeCount(likeCount + (isLiked ? -1 : 1));

        setLikeAnimation("goUp");

        // Wait for a short time before updating the like count
        setTimeout(() => {
          setIsLiked(!isLiked);
          setLikeCount(likeCount + (isLiked ? -1 : 1));
        }, 100); // Adjust the delay time if needed

        // Set animation states to wait for down and then reset to initial
        setTimeout(() => setLikeAnimation("waitDown"), 100);
        setTimeout(() => setLikeAnimation("initial"), 200);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // May change it later
  const parseHashtags = (content) => {
    const hashtagsRegex = /#(\p{L}[\p{L}\p{N}_-]*)/gu;

    const parsedContent = content.replace(
      hashtagsRegex,
      '<a class="hashtag" href="/hashtags/$1">#$1</a>'
    );

    return { __html: parsedContent };
  };

  const props = {
    _id,
    user,
    content,
    hashtags,
    createdAt,
    photos,
    likes,
    postRepliesCounter,
    handleReplyModel,
    handleLike,
    likeCount,
    isLiked,
    likeAnimation,
  };

  // Check post liked
  useEffect(() => {
    const isPostLikedByLoggedInUser = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/is-post-liked/${_id}`,
          "",
          { withCredentials: true }
        );
        // console.log(response.data);
        setIsLiked(response.data.isPostLiked);
      } catch (error) {
        console.log(error);
      }
    };

    isPostLikedByLoggedInUser();
  }, []);

  // Hide scrollbar when model is active
  useEffect(() => {
    if (!isReplyModelHidden) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isReplyModelHidden]);

  // Fetch and count post replies
  useEffect(() => {
    const fetchPostReplies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/replies/${_id}`
        );

        setPostRepliesCounter(response.data.replies.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostReplies();
  }, [_id]);

  return (
    <>
      {isParent ? (
        <ParentPost {...props} />
      ) : isLink ? (
        <LinkPost {...props} />
      ) : (
        <SinglePost {...props} />
      )}

      {/* Reply modal */}
      <div
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
          {/* Modal Header */}
          {/* <div className="w-full flex items-center justify-between mb-2">
            <button
              className="text-[#101010] dark:text-[#fff]"
              onClick={handleReplyModel}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div> */}
          <CreateReply
            user={user}
            content={content}
            createdAt={createdAt}
            postId={_id}
            setIsReplyModelHidden={setIsReplyModelHidden}
          />
        </div>
      </div>
    </>
  );
};
export default Post;
