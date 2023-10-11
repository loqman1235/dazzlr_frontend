import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { loginAsync } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [isPassHidden, setIsPassHidden] = useState(true);
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm, setFieldError }
  ) => {
    try {
      const response = await dispatch(loginAsync(values));

      if (loginAsync.fulfilled.match(response)) {
        setErrors({});
        resetForm();
        navigate("/home");
      } else if (loginAsync.rejected.match(response)) {
        setFieldError("password", response.payload);
      }
    } catch (error) {
      console.log(error);
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#FEFFFE] dark:bg-[#0A0E28]/80">
      {/* Register Container */}
      <div className="w-[480px] p-6 rounded-2xl bg-white dark:bg-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-[#0A0E28] dark:text-white mb-4">
          Sign In
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(isSubmitting, errors) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold mb-2 block text-[#0A0E28] dark:text-white"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control"
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500"
              />

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-semibold mb-2 block text-[#0A0E28] dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={`${isPassHidden ? "password" : "text"}`}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="form-control"
                  />
                  {/* Show/hide password button */}
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333333] hover:text-[#0A0E28] dark:text-[#A0A0A0] dark:hover:text-white transition cursor-pointer"
                    onClick={(e) => setIsPassHidden(!isPassHidden)}
                  >
                    {isPassHidden ? (
                      <AiOutlineEye size={24} />
                    ) : (
                      <AiOutlineEyeInvisible size={24} />
                    )}
                  </div>
                </div>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-500"
              />

              <button
                type="submit"
                className="w-full py-4 bg-[#1D9AF1] text-white text-lg font-bold rounded-xl hover:opacity-90 focus:outline-none focus:ring focus:ring-[#FF5722] dark:focus:ring-[#FF5722] transition"
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>

        <div className="mt-4">
          <p className="text-[#0A0E28] dark:text-white text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1D9AF1] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
