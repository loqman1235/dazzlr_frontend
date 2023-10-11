import { useDispatch, useSelector } from "react-redux";
import { followUserThunk, unfollowUserThunk } from "../../features/followSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FollowBtn = ({ userId, fullname }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);

  const checkIfAlreadyFollowed = async (userId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/is-user-followed/${userId}`,
        "",
        { withCredentials: true }
      );
      console.log(response.data, userId);
      setIsFollowed(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = () => {
    dispatch(followUserThunk(userId));
    setIsFollowed(true);
    toast.success(`You are now following ${fullname}`);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUserThunk(userId));
    setIsFollowed(false);
    toast.error(`You unfollowed ${fullname}`);
  };

  useEffect(() => {
    checkIfAlreadyFollowed(userId);
  }, [userId]);

  return (
    <button
      onClick={isFollowed ? handleUnfollow : handleFollow}
      className={`btn btn-sm px-6 ${
        isFollowed ? "btn-danger" : "btn-secondary"
      }`}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowBtn;
