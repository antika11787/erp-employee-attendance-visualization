import { axiosInstance, axiosInstanceToken } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { FileResponse, FileUpload } from "@/types/interface";
import dotenv from "dotenv";
dotenv.config();

export const UpdateTotalEmployeeApi = async (data: any) => {
  return axiosInstanceToken
    .patch("/api/v1/employee/update-total-employees", data)
    .then((response) => {
      toast.success("Updated successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
};

export const setTotalEmployeesApi = async (data: any) => {
  return axiosInstance
    .post("/api/v1/employee/set-total-employees", data)
    .then((response) => {
      toast.success("Updated successfully");
      return response.data.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
      console.log("error", error);
    });
}

export const GetTotalEmployeeApi = async () => {
  return axiosInstance
    .get("/api/v1/employee/get-total-employee")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const GetAllEmployeesApi = async (id: string, searchQuery?: string) => {
  try {
    const queryParams: { [key: string]: string | number | undefined } = {
      search: searchQuery,
    };

    let queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const response = await axiosInstanceToken(
      `/api/v1/employee/get-all-employees/${id}?${queryString}`
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
  }
};

export const GetSingleEmployeeDataApi = async (id: string, searchQuery?: string) => {
  try {
    const queryParams: { [key: string]: string | number | undefined } = {
      search: searchQuery,
    };

    let queryString = Object.entries(queryParams)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const response = await axiosInstanceToken(
      `/api/v1/employee/get-single-employee-data/${id}?${queryString}`
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
  }
};

export const GetEmployeeDetailsApi = async (id: string, date: any) => {
  return axiosInstanceToken
    .get(`/api/v1/employee/get-employee-details/${id}/${date}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export const getAvgDataApi = async (id: string, duration: any) => {
  return axiosInstanceToken
    .get(`/api/v1/employee/get-average-data/${id}/${duration}`)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error", error);
    });         

} 