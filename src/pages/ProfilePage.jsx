import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import VerifiedBadge from "../components/common/VerifiedBadge";
import {
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
  EnvelopeIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { BiEnvelope, BiDotsHorizontalRounded } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPostsAsync } from "../features/postSlice";
import SkeletonPost from "../components/common/SkeletonPost";
import { format } from "date-fns";
import { getUserThunk } from "../features/userSlice";
import { MoonLoader } from "react-spinners";
import { followUserThunk, unfollowUserThunk } from "../features/followSlice";
import axios from "axios";
import FollowBtn from "../components/common/FollowBtn";
import FollowBadge from "../components/common/FollowBadge";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { status, userPosts, error } = useSelector((state) => state.post);
  const { isDarkMode } = useSelector((state) => state.theme);
  const { userData, isLoading } = useSelector((state) => state.user);
  const { isFollowed } = useSelector((state) => state.follow);

  const { userHandler } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync(userHandler));
    dispatch(getUserThunk(userHandler));
  }, [dispatch, userHandler]);

  useEffect(() => {
    if (userData) {
      document.title = `Dazzlr / (${userData.userHandler || "User"}) ${
        userData.fullname
      }`;
    }

    return () => {
      document.title = "Dazzlr";
    };
  }, [userData]);

  const isOwnProfile = user && userHandler === user.userHandler;

  return (
    <>
      {isLoading ? (
        <div className="w-full md:w-[60%] pb-20 h-screen flex items-center justify-center">
          <MoonLoader size={24} color="#1D9AF1" />
        </div>
      ) : (
        <div className="w-full md:w-[60%] pb-20">
          {/* Profile Details */}

          <div className="w-full">
            <div className="w-full h-[220px] bg-[#0A0E28]/10 dark:bg-white/10">
              {userData?.cover && (
                <img
                  src={userData?.cover.url}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="w-full -mt-24 border-b border-b-black/5 dark:border-b-white/5">
              <div className="p-5">
                {/* Profile Picture */}
                <div className="relative z-10 cursor-pointer w-36 h-36 rounded-full border-4 border-[#FEFFFE] bg-[#FEFFFE] dark:border-[#0A0E28] dark:bg-[#0A0E28] mb-4 p-[1px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={userData?.avatar.url}
                      alt={`${userData?.fullname}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute right-1 bottom-0 z-20 bg-[#FEFFFE] dark:bg-[#0A0E28] p-px rounded-full">
                    {userData?.isVerified && (
                      <VerifiedBadge width="w-7" height="h-7" />
                    )}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between mb-3">
                  {/* Username */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-bold flex items-center gap-1">
                      {userData?.fullname}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] ">
                        {userData?.userHandler}
                      </span>
                      {userData?.following.some(
                        (u) => u?._id === user?._id
                      ) && <FollowBadge />}
                    </div>
                  </div>
                  {/* Edit Profile Button */}
                  {isOwnProfile ? (
                    <Link to="/settings/profile" className="btn-outline">
                      Edit Profile
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className="btn-outline px-2">
                        <BiDotsHorizontalRounded size={20} />
                      </button>
                      <button className="btn-outline px-2">
                        <BiEnvelope size={20} />
                      </button>
                      <FollowBtn
                        userId={userData?._id}
                        fullname={userData?.fullname}
                      />
                    </div>
                  )}
                </div>
                {/* Number of followers */}
                <div className="flex items-center gap-4 mb-3">
                  <Link
                    to={`/${userHandler}/followers`}
                    className="flex items-center gap-1 text-[15px] text-[#536471] dark:text-[#A0A0A0] hover:underline"
                  >
                    <span className="text-[#0E1418] dark:text-[#FEFEFE] font-semibold">
                      {userData?.followers.length}
                    </span>{" "}
                    Followers
                  </Link>

                  <Link
                    // Link to following page
                    to={`/${userHandler}/following`}
                    className="flex items-center gap-1 text-[15px] text-[#536471] dark:text-[#A0A0A0] hover:underline"
                  >
                    <span className="text-[#0E1418] dark:text-[#FEFEFE] font-semibold">
                      {userData?.following.length}
                    </span>{" "}
                    Following
                  </Link>
                </div>
                {/* Description */}
                {userData?.bio && (
                  <p className="text-[15px] mb-3">{userData.bio}</p>
                )}
                {/* info */}
                <ul className="flex items-center gap-5">
                  {userData?.createdAt && (
                    <li className="text-[#536471] dark:text-[#A0A0A0] text-[15x] flex items-center gap-1 capitalize">
                      <CalendarIcon className="w-4 h-4 stroke-2" /> Joined{" "}
                      {format(new Date(userData.createdAt), "MMMM, yyyy")}
                    </li>
                  )}
                  {userData?.userLocation && (
                    <li className="text-[#536471] dark:text-[#A0A0A0] text-[15x] flex items-center gap-1 capitalize">
                      <MapPinIcon className="w-4 h-4 stroke-2" />{" "}
                      {userData?.userLocation?.city},
                      {userData?.userLocation?.country}
                    </li>
                  )}
                  {userData?.website && (
                    <li className="text-[#536471] dark:text-[#A0A0A0] text-[15x] flex items-center gap-1 lowercase">
                      <LinkIcon className="w-4 h-4 stroke-2" />{" "}
                      {userData.website}
                    </li>
                  )}
                </ul>
              </div>

              {/* Tabs */}
              <ul className="w-full flex items-center">
                <li className="flex-1 relative after:absolute after:w-full after:h-[2px] after:bg-[#1D9AF1] after:bottom-[-1px] after:left-0">
                  <Link
                    className="text-[15px] hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center justify-center p-4 font-semibold"
                    to="/profile"
                  >
                    Posts
                  </Link>
                </li>
                <li className="flex-1">
                  <Link
                    className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5 hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
                    to="/profile"
                  >
                    Replies
                  </Link>
                </li>
                <li className="flex-1">
                  <Link
                    className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5 hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
                    to="/profile"
                  >
                    Media
                  </Link>
                </li>
                <li className="flex-1">
                  <Link
                    className="text-[15px] text-[#536471] dark:text-[#A0A0A0] dark:hover:bg-white/5  hover:bg-black/5 transition flex items-center justify-center p-4 font-semibold"
                    to="/profile"
                  >
                    Likes
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Posts */}
          {status === "pending" &&
            [1, 2, 3, 4].map((index) => <SkeletonPost key={index} />)}
          {status === "fulfilled" && userPosts !== 0 ? (
            userPosts.map((post) => <Post key={post._id} {...post} />)
          ) : (
            <div className="p-5 flex gap-4 items-center justify-center ">
              <p className="text-sm text-[#536471] dark:text-[#A0A0A0]">
                No Posts yet!
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ProfilePage;
