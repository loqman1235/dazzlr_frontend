import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPoll, BiSmile, BiImageAlt, BiX } from "react-icons/bi";
import {
  createReplyThunk,
  fetchPostRepliesThunk,
} from "../features/replySlice";

const ReplyForm = ({ in_reply_to, setIsReplyModelHidden }) => {
  const dispatch = useDispatch();
  const { user: storedUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [counter, setCounter] = useState(200);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePhotosChange = (e) => {
    const selectedPhotos = e.target.files;
    const photosArray = Array.from(selectedPhotos);
    setPhotos(photosArray);
  };

  const handleRemovePhoto = (e, index) => {
    e.preventDefault();
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handleReplyChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreateReply = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("in_reply_to", in_reply_to);

      if (photos.length > 0) {
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }
      }

      setLoading(true);
      const response = await dispatch(createReplyThunk(formData));
      setLoading(false);
      if (createReplyThunk.fulfilled.match(response)) {
        console.log(response.payload);
        setContent("");
        setPhotos([]);
        dispatch(fetchPostRepliesThunk(in_reply_to));
        setIsReplyModelHidden(true);

        console.log("Post created successfully");
      } else {
        console.log(response.payload);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    setCounter(200 - content.length);
  }, [content]);
  return (
    <div className="flex gap-5">
      {/* Avatar */}
      <div className="flex items-center flex-col gap-1">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
          <img
            src={storedUser?.avatar?.url}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Reply form */}
      <form className="w-full" onSubmit={handleCreateReply}>
        <textarea
          name=""
          id=""
          className="w-full min-h-[60px] outline-none border-none bg-transparent text-lg resize-none"
          placeholder="Enter your reply"
          onChange={handleReplyChange}
          value={content}
        ></textarea>
        {/* Photos preview */}
        {photos && (
          <div
            className={`my-2 w-full grid gap-2 ${
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

        {/* Buttons */}
        <div className="w-full flex items-center justify-between">
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
            <button className="create-post-rounded-btn relative">
              <BiSmile size={24} />
              {/* {showEmojiPicker && (
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
          )} */}
            </button>

            <button className="create-post-rounded-btn">
              <BiPoll size={24} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            {counter !== 200 && (
              <span
                className={`text-sm ${counter < 0 && "text-red-600"}`}
                id="charCounter"
              >
                {counter}
              </span>
            )}
            <button
              className="btn btn-sm btn-primary !px-8"
              type="submit"
              disabled={content.length === 0 || counter < 0 || loading}
            >
              Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ReplyForm;
