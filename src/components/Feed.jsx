import CreatePost from "../components/CreatePost";

const Feed = () => {
  return (
    <div className="w-[calc(100%-720px)] min-h-screen absolute p-5 left-[300px] z-[-1] mt-16">
      <CreatePost />
    </div>
  );
};
export default Feed;
