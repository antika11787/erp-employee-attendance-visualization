import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FileResponse, FileUpload } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const UploadFileApi = async (file: any) => {
  return axiosInstanceToken
    .post("/api/v1/file/upload-file", file)
    .then((response) => {
      toast.success("File uploaded successfully");
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const totalCheckInApi = async (id: string, date: any) => {
  return axiosInstance
    .post("/api/v1/file/total-checkin", {
      id: id,
      date: date,
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const totalLateApi = async (id: string, date: any) => {
  return axiosInstance
    .post("/api/v1/file/total-late", {
      id: id,
      date: date,
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetUniqueDatesApi = async (id: string) => {
  return axiosInstance
    .get(`/api/v1/file/get-dates/${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const FileHistoryApi = async (searchQuery?: string) => {
  try {
    const queryParams: { [key: string]: string | number | undefined } = {
      searchFiles: searchQuery,
    };

    let queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const response = await axiosInstanceToken(
      `/api/v1/file/get-all-files?${queryString}`
    );
    const data = response.data;

    if (data.success === false) {
      console.log("Error: ", data.message);
    }

    return data.data;
  } catch (error: any) {
    console.error(
      error.message || "An unknown error occurred during fetching data"
    );
    throw error;
  }
};

export const DeleteFileApi = async (id: string) => {
  return axiosInstanceToken
    .delete(`/api/v1/file/delete-file/${id}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
