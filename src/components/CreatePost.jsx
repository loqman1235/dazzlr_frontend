import { BiImageAlt, BiSmile, BiPoll, BiX } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useSelector, useDispatch } from "react-redux";
import { createPostAsync, toggleCreatePostModal } from "../features/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserThunk } from "../features/userSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const { userData, isLoading } = useSelector((state) => state.user);
  const [postContent, setPostContent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [counter, setCounter] = useState(200);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiPickerClick = (e) => {
    // Prevent the click event from propagating to the parent button
    e.stopPropagation();
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", postContent);

      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }
      }

      // Add logic to handle posting the content here
      setLoading(true);
      const response = await dispatch(createPostAsync(formData));
      setLoading(false);
      if (createPostAsync.fulfilled.match(response)) {
        toast.success(response.payload.message);
        setPostContent("");
        setPhotos([]);
        dispatch(toggleCreatePostModal(true));
        navigate("/home");
      } else if (createPostAsync.rejected.match(response)) {
        console.log(response.payload);
        const errorMessage = response.payload[0]?.msg;
        toast.error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating post:", error);
      // Handle the error gracefully without clearing the userPosts state
      toast.error("Failed to create the post.");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    const emojiCode = emojiObject.emoji;
    const updatedContent = `${postContent} ${emojiCode} `;
    setPostContent(updatedContent);
  };

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleRemovePhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handlePhotosChange = (e) => {
    const selectedPhotos = e.target.files;
    const photosArray = Array.from(selectedPhotos);
    setPhotos(photosArray);
  };

  useEffect(() => {
    setCounter(200 - Number(postContent.length));
  }, [postContent]);

  return (
    <>
      {/* Profile Avatar */}
      {isLoading ? (
        <Skeleton
          baseColor={isDarkMode ? "#1C233C" : "#E0E0E0"}
          highlightColor={isDarkMode ? "#27334D" : "#F5F5F5"}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={user?.avatar?.url}
            alt="avatar"
            className="w-full h-full object-cover"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}

      {/* Create post form */}
      <form className="flex-1 relative" onSubmit={handleCreatePost}>
        <div className="relative w-full text-xl">
          {/* Post Content */}
          <textarea
            name="postContent"
            id="postContent"
            className="w-full min-h-[60px] outline-none border-none bg-transparent text-lg resize-none"
            placeholder="Illuminate the world with your brilliance..."
            onChange={handleChange}
            value={postContent}
            spellCheck="false"
          ></textarea>
          {/* Preview uploaded photos */}
          {photos && (
            <div
              className={`mt-2 w-full grid gap-2 ${
                photos.length === 1 ? "grid-cols-1" : "grid-cols-2 "
              }`}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="rounded-2xl min-h-[200px] overflow-hidden min-w-full relative"
                >
                  {/* Button to remove a photo */}
                  <button
                    className="absolute right-2 top-2 bg-black/40 hover:bg-black/30 transition text-white p-1 rounded-full flex items-center justify-center"
                    onClick={(e) => handleRemovePhoto(e, index)}
                  >
                    <BiX size={20} />
                  </button>
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Image placeholder */}
        <div className="w-full mt-4 flex items-center justify-between transition-all duration-300 border-t border-t-black/10 dark:border-t-white/10 pt-5">
          {/* Buttons */}
          <div className="flex items-center gap-2 relative">
            {/* Upload Media Button */}
            <label className="create-post-rounded-btn">
              <BiImageAlt size={24} />
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                multiple
                onChange={handlePhotosChange}
              />
            </label>
            <button
              className="create-post-rounded-btn relative"
              onClick={toggleEmojiPicker}
            >
              <BiSmile size={24} />
              {showEmojiPicker && (
                <div
                  className="absolute top-full left-0"
                  id="emojiPickerContainer"
                  onClick={handleEmojiPickerClick}
                >
                  <EmojiPicker
                    theme={isDarkMode && "dark"}
                    onEmojiClick={handleEmojiClick}
                  />
                </div>
              )}
            </button>

            <button className="create-post-rounded-btn">
              <BiPoll size={24} />
            </button>
          </div>
          {/* Post Button */}
          <div className="flex items-center gap-5">
            {counter !== 200 && (
              <span className={`text-sm ${counter < 0 && "text-red-600"}`}>
                {counter}
              </span>
            )}
            <button
              className="btn btn-sm btn-primary !px-8"
              disabled={postContent.length === 0 || counter < 0 || loading}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
