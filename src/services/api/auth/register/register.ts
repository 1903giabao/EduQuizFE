import axiosClient from "../../axiosClient";
import { ApiResponse } from "../../../../types/api-response";
import { RegisterPayload } from "./register-payload";

export const register = async (payload: RegisterPayload) => {
  try {
    const res = await axiosClient.post<ApiResponse<null>>(
      "/auth/register",
      payload
    );
    const apiData = res.data;

    if (!apiData.success) {
      return {
        errorMessage:
          apiData.errors?.[0]?.message || "Invalid email or password",
      };
    }

    return;
  } catch (err) {
    return {
      errorMessage:
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Login failed",
    };
  }
};
