"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FormDataLogin, InputFieldProps } from "@/types/interface";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./index.scss";
import Image from "next/image";
import { LoginApi } from "@/apiEndpoints/auth";
import { saveLogin } from "@/redux/slices/UserSlice";
import FormInput from "@/components/elements/formInput";
import FormInputPassword from "@/components/elements/formInputPassword";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: FormDataLogin) => {
    try {
      const response = await LoginApi(data);
      dispatch(saveLogin(response));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <Image
            src={"/stats.gif"}
            alt="login-image"
            height={400}
            width={400}
            className="login-image"
          />
        </div>
        <div className="login-right">
          <h1 className="login-header">Log In to Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <FormInput
              nameProp="email"
              requiredProp="Email is required"
              placeholder="Enter email"
              control={control}
              errors={errors}
            />

            <FormInputPassword
              nameProp="password"
              requiredProp="Password is required"
              placeholder="Enter password"
              control={control}
              errors={errors}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              watch={watch}
              rules={{
                required: "Password is required",
              }}
            />

            <div className="login-submit-button-container">
              <button type="submit" className="login-submit-button">
                Login
              </button>
            </div>

            <p className="signup-form-text">
              Do not have an account?{" "}
              <Link href="/signup" className="signup-form-link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
