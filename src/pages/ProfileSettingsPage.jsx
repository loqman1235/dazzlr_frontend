import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk, updateUserThunk } from "../features/userSlice";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProfileSettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userData, isLoading } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const validationSchema = Yup.object().shape({
    country: Yup.string()
      .min(3, "Country must be at least 2 chars")
      .max(20, "Country mas be at max of 20 chars"),
    city: Yup.string()
      .min(3, "City must be at least 2 chars")
      .max(20, "City mas be at max of 20 chars"),
    fullname: Yup.string()
      .min(3, "Display name must be at least 2 chars")
      .max(15, "Dislay name must be at max of 15 chars"),
    bio: Yup.string().max(200, "Bio must be 200 characters or less"),
  });

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("bio", values.bio);
      formData.append("userLocation", values.userLocation);
      formData.append("website", values.website);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      if (cover) {
        formData.append("cover", cover);
      }

      const response = await dispatch(updateUserThunk(formData));

      if (updateUserThunk.fulfilled.match(response)) {
        toast.success(response.payload.message);
        navigate(`/${userData?.userHandler}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(getUserThunk(user?.userHandler));
  }, [dispatch, user]);

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
              Edit Profile
            </h2>
          </div>

          {/* Profile settings */}
          <div className="p-5">
            {/* Cover and Avatar settings */}
            {/* Preview */}
            <div className="w-full overflow-hidden">
              {/* Cover */}
              <div className="bg-[#101010]/10 dark:bg-white/10 w-full h-[180px] rounded-md overflow-hidden">
                {cover === null ? (
                  userData?.cover && (
                    <img
                      src={userData.cover.url}
                      className="w-full h-full object-cover"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  )
                ) : (
                  <img
                    src={URL.createObjectURL(cover)}
                    className="w-full h-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </div>
              {/* Profile details */}
              <div className="px-5 -mt-14 mb-10">
                <div className="relative z-10 w-32 h-32 border-4 border-[#FEFFFE] bg-[#FEFFFE] dark:border-[#101010] dark:bg-[#101010] mb-4 p-[1px] rounded-full">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {avatar === null ? (
                      <img
                        src={
                          userData?.avatar?.url
                            ? userData.avatar.url
                            : "/Avatar.svg"
                        }
                        className="w-full h-full object-cover"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(avatar)}
                        className="w-full h-full object-cover"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    )}
                  </div>
                </div>
                {/* Username and handler */}
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold flex items-center gap-1">
                    {userData?.fullname}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[#536471] dark:text-[#A0A0A0] text-[15px] ">
                      {userData?.userHandler}
                    </span>
                  </div>
                </div>
              </div>
              <Formik
                initialValues={{
                  userLocation: userData?.userLocation || "",
                  fullname: userData?.fullname || "",
                  bio: userData?.bio || "",
                  website: userData?.website || "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateProfile}
              >
                {({ isSubmitting, errors }) => (
                  <Form encType="multipart/form-data">
                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="cover"
                      >
                        Choose cover
                      </label>
                      <Field
                        type="file"
                        name="cover"
                        id="cover"
                        className="input"
                        onChange={(e) => setCover(e.target.files[0])}
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="avatar"
                      >
                        Choose profile picture
                      </label>
                      <Field
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="input"
                        onChange={(e) => setAvatar(e.target.files[0])}
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="userLocation"
                      >
                        Location
                      </label>
                      <Field
                        type="text"
                        name="userLocation"
                        id="userLocation"
                        className="input"
                      />
                      <ErrorMessage
                        name="userLocation"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="fullname"
                      >
                        Display name
                      </label>
                      <Field
                        type="text"
                        name="fullname"
                        id="fullname"
                        className="input"
                      />
                      <ErrorMessage
                        name="fullname"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="website"
                      >
                        Website
                      </label>
                      <Field
                        type="text"
                        name="website"
                        id="website"
                        className="input"
                      />
                      <ErrorMessage
                        name="website"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                      <label
                        className="text-sm font-medium capitalize"
                        htmlFor="bio"
                      >
                        Bio
                      </label>
                      <Field
                        as="textarea"
                        name="bio"
                        id="bio"
                        rows="5"
                        className="input"
                      />
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary text-base px-8 py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProfileSettingsPage;
