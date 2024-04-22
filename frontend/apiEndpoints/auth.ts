import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FormData, FormDataLogin } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const SignUpApi = async (data: FormData) => {
  return axiosInstance
    .post("/api/v1/auth/signup", data)
    .then((response) => {
      toast.success("Sign Up successful");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const LoginApi = async (data: FormDataLogin) => {
  return axiosInstance
    .post("/api/v1/auth/login", data)
    .then((response) => {
      toast.success("Login successful");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};
