import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { isAuth, isError, isLoading, messages } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPassHidden, setIsPassHidden] = useState(true);
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    password_conf: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    fullname: Yup.string()
      .required("Full name is required")
      .max(20)
      .min(3)
      .matches(/^[A-Za-z ]*$/, "Please enter a valid full name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email name is required"),
    password: Yup.string().required("Password is required"),
    password_conf: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Password confirmation is required"),
  });

  const handleRegister = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await dispatch(registerAsync(values));
      setErrors({});
      resetForm();
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-5 flex items-center justify-center bg-[#FEFFFE] dark:bg-[#0A0E28]/80">
      {/* Register Container */}
      <div className="w-[480px] p-6 rounded-2xl bg-white dark:bg-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-[#0A0E28] dark:text-white mb-4">
          Create an Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="text-sm font-semibold mb-2 block text-[#0A0E28] dark:text-white"
                >
                  Fullname
                </label>
                <Field
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your full name"
                  className={`form-control ${
                    errors?.fullname && "!border-red-500"
                  }`}
                />
              </div>
              <ErrorMessage
                name="fullname"
                component="p"
                className="text-sm !text-red-500"
              />

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
                  className={`form-control ${
                    errors?.email && "!border-red-500"
                  }`}
                />
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-500"
              />

              <div className="relative">
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
                    className={`form-control ${
                      errors?.password && "!border-red-500"
                    }`}
                  />
                  {/* Show/hide password button */}
                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333333] hover:text-[#0A0E28] dark:text-[#A0A0A0] dark:hover:text-white transition cursor-pointer"
                    onClick={() => setIsPassHidden(!isPassHidden)}
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold mb-2 block text-[#0A0E28] dark:text-white"
                >
                  Confirm Password
                </label>
                <Field
                  type={`${isPassHidden ? "password" : "text"}`}
                  name="password_conf"
                  id="password_conf"
                  placeholder="Confirm your password"
                  className={`form-control ${
                    errors?.password_conf && "!border-red-500"
                  }`}
                />
              </div>
              <ErrorMessage
                name="password_conf"
                component="p"
                className="text-sm text-red-500"
              />

              <button
                type="submit"
                className="w-full py-4 bg-[#1D9AF1] text-white text-lg font-bold rounded-xl hover:opacity-90 focus:outline-none focus:ring focus:ring-[#FF5722] dark:focus:ring-[#FF5722] transition"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4">
          <p className="text-[#0A0E28] dark:text-white text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1D9AF1] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
