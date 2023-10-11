import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useEffect } from "react";
import { fetchFeedPostsThunk, fetchPostsAsync } from "../features/postSlice";
import SkeletonPost from "../components/common/SkeletonPost";

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userPosts, status, feed } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync(user.userHandler));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFeedPostsThunk());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Home / Dazzlr";
    return () => {
      document.title = "Dazzlr";
    };
  }, []);

  return (
    <>
      <div className="w-full md:w-[60%] relative pb-20">
        {/* Feed Header */}
        <div className="w-full z-20 p-5 border-b border-b-black/10 dark:border-b-white/10 bg-[#FEFFFE]/80 dark:bg-[#0A0E28]/80 backdrop-blur-lg sticky top-0">
          <h2 className="font-bold text-xl">Home</h2>
        </div>
        <div className="p-5 w-full flex items-start gap-4 border-b border-b-black/10 dark:border-b-white/10">
          <CreatePost />
        </div>
        {status === "pending" &&
          [1, 2, 3, 4].map((index) => <SkeletonPost key={index} />)}
        {status === "fulfilled" && feed !== 0 ? (
          feed.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <div className="p-5 flex gap-4 items-center justify-center ">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">
                You're not following anyone yet
              </h2>
              <p className="text-sm text-[#536471] dark:text-[#A0A0A0]">
                Dazzlr gets more interesting once you follow other users.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default HomePage;
