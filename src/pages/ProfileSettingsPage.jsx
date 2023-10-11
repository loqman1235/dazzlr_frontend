import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../features/userSlice";
import { MoonLoader } from "react-spinners";
import axios from "axios";

const ProfileSettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { userData, isLoading } = useSelector((state) => state.user);

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

  const handleUpdateProfile = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("bio", values.bio);

      console.log(values);
      // formData.append("avatar", values.avatar);
      // formData.append("cover", values.cover);

      // const response = await axios.put(
      //   `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      //   formData,
      //   { withCredentials: true }
      // );

      // console.log(response.data);
    } catch (error) {
      console.error(error);
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
          <div className="w-full z-20 p-5 border-b border-b-black/10 dark:border-b-white/10 bg-[#FEFFFE]/80 dark:bg-[#0A0E28]/80 backdrop-blur-lg sticky top-0">
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
              <div className="bg-[#0A0E28]/10 dark:bg-white/10 w-full h-[180px] rounded-md overflow-hidden">
                {userData?.cover && (
                  <img
                    src={userData.cover.url}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Profile details */}
              <div className="px-5 -mt-14 mb-10">
                <div className="relative z-10 w-32 h-32 border-4 border-[#FEFFFE] bg-[#FEFFFE] dark:border-[#0A0E28] dark:bg-[#0A0E28] mb-4 p-[1px] rounded-full">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={
                        userData?.avatar?.url
                          ? userData.avatar.url
                          : "/Avatar.svg"
                      }
                      className="w-full h-full object-cover"
                    />
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
                  cover: null,
                  avatar: null,
                  country: userData?.location?.country || "",
                  city: userData?.location?.city || "",
                  fullname: userData?.fullname || "",
                  bio: userData?.bio || "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateProfile}
              >
                {({ isSubmitting, errors, setFieldValue }) => (
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
                        onChange={(e) => {
                          e.preventDefault();
                          setFieldValue("cover", e.currentTarget.files[0]);
                        }}
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
                        onChange={(e) => {
                          e.preventDefault();
                          setFieldValue("avatar", e.currentTarget.files[0]);
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="flex flex-col gap-2 mb-5">
                        <label
                          className="text-sm font-medium capitalize"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <Field
                          type="text"
                          name="country"
                          id="country"
                          className="input"
                        />
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="flex flex-col gap-2 mb-5">
                        <label
                          className="text-sm font-medium capitalize"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <Field
                          type="text"
                          name="city"
                          id="city"
                          className="input"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
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
                    >
                      Save
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
