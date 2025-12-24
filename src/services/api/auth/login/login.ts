import axiosClient from "../../axiosClient";
import { ApiResponse } from "../../../../types/api-response";

type ApiError = {
  message: string;
};

type LoginResponse = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  role: string;
  accountId: string;
};

type LoginResult = {
  accessToken: string;
  refreshToken: string;
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
        accessToken: null,
        refreshToken: null,
        role: null,
        accountId: null,
        errorMessage:
          apiData.errors?.[0]?.message || "Invalid email or password",
      };
    }

    const { token, role, accountId } = apiData.data;

    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("role", role);

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      role,
      accountId,
      errorMessage: null,
    };
  } catch (err) {
    return {
      accessToken: null,
      refreshToken: null,
      role: null,
      accountId: null,
      errorMessage:
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Login failed",
    };
  }
};
