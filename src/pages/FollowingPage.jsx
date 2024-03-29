import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserThunk } from "../features/userSlice";
import { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import VerifiedBadge from "../components/common/VerifiedBadge";
import FollowBtn from "../components/common/FollowBtn";
import FollowBadge from "../components/common/FollowBadge";

const FollowingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userData, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userHandler } = useParams();

  useEffect(() => {
    dispatch(getUserThunk(userHandler));
  }, [dispatch, userHandler]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
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
              Following
            </h2>
          </div>
          {/* List of followers */}
          <div className="p-5 flex flex-col gap-5">
            {userData?.following.length > 0 ? (
              userData?.following.map((followinUser) => (
                <div
                  key={followinUser?._id}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={`${followinUser?.avatar.url}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <Link
                        to={`/${followinUser?.userHandler}`}
                        className="text-[14px] font-bold flex items-center gap-1 hover:underline"
                      >
                        {followinUser?.fullname}{" "}
                        {followinUser?.isVerified && (
                          <VerifiedBadge
                            size="small"
                            type={followinUser?.accountType}
                          />
                        )}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] ">
                          {followinUser?.userHandler}
                        </span>
                        {userData?.followers.some(
                          (u) => u?._id === followinUser?._id
                        ) && <FollowBadge />}
                      </div>
                    </div>
                  </div>

                  {user?._id !== followinUser?._id && (
                    <FollowBtn
                      userId={followinUser?._id}
                      fullname={followinUser?.fullname}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="p-5 flex gap-4 items-center justify-center ">
                <p className="text-sm text-[#536471] dark:text-[#A0A0A0]">
                  This user doesn't follow anyone yet.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default FollowingPage;
