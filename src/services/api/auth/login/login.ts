import axiosClient from "../../axiosClient";
import { ApiResponse } from "../../../../types/api-response";

type LoginResponse = {
  role: string;
  accountId: string;
};

type LoginResult = {
  role: string;
  accountId: string;
  errorMessage: string;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  try {
    const res = await axiosClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      {
        email,
        password,
      }
    );
    const apiData = res.data;

    if (!apiData.success) {
      return {
        role: null,
        accountId: null,
        errorMessage:
          apiData.errors?.[0]?.message || "Invalid email or password",
      };
    }

    const { role, accountId } = apiData.data;

    return {
      role,
      accountId,
      errorMessage: null,
    };
  } catch (err) {
    return {
      role: null,
      accountId: null,
      errorMessage:
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Login failed",
    };
  }
};
