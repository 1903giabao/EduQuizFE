import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiResponse } from "../../types/api-response";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:44398/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<null>>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig | undefined;

    const isAuthRefresh = originalRequest?.url?.includes("/auth/refresh");
    const skipAuthRefresh = originalRequest?.url?.includes("/auth/me");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      skipAuthRefresh &&
      !isAuthRefresh
    ) {
      originalRequest._retry = true;

      try {
        await axiosClient.post("/auth/refresh");

        return axiosClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
