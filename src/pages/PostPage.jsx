import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostThunk } from "../features/postSlice";
import { MoonLoader } from "react-spinners";
import { BiArrowBack } from "react-icons/bi";
import ReplyForm from "../components/ReplyForm";
import {
  fetchPostRepliesThunk,
  fetchReplyParentPostsThunk,
} from "../features/replySlice";

const PostPage = () => {
  const { post, postStatus } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigate = useNavigate();
  const postReplies = useSelector(
    (state) => state.reply.postReplies[postId] || []
  );
  const replyParentPosts = useSelector(
    (state) => state.reply.replyParentPosts[postId] || []
  );

  const { postRepliesLoading, replyParentPostsLoading } = useSelector(
    (state) => state.reply
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchPostThunk(postId));
    dispatch(fetchReplyParentPostsThunk(postId));
    dispatch(fetchPostRepliesThunk(postId));
  }, [postId]);

  return (
    <>
      {postStatus === "pending" ? (
        <div className="w-full md:w-[60%] pb-20 h-screen flex items-center justify-center">
          <MoonLoader size={24} color="#1D9AF1" />
        </div>
      ) : (
        <div className="w-full md:w-[60%] relative pb-20">
          <div className="w-full z-20 p-5 border-b border-b-black/10 dark:border-b-white/10 bg-[#FEFFFE]/80 dark:bg-[#101010]/80 backdrop-blur-lg sticky top-0">
            <h2 className="font-bold text-xl flex items-center gap-4">
              {/* Go back */}
              <button onClick={handleGoBack}>
                <BiArrowBack />
              </button>{" "}
              Post
            </h2>
          </div>
          {/* display parents here */}
          <div className="p-5 pb-0">
            {!replyParentPostsLoading &&
              replyParentPosts.map((parent) => (
                <Post {...parent} isParent={true} isLink={false} />
              ))}
          </div>
          {post && <Post {...post} isLink={false} />}
          <div className="p-5 border-b border-b-black/10 dark:border-b-white/10">
            <ReplyForm in_reply_to={post?._id} />
          </div>
          {/* Replies */}
          {/* <ReplyBox /> */}
          <div id="replies">
            {!postRepliesLoading &&
              postReplies.map((reply) => (
                <Post key={reply._id} {...reply} isReply={true} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default PostPage;
