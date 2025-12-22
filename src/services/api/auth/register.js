import axiosClient from "../axiosClient";

export const register = async (payload) => {
  try {
    const res = await axiosClient.post("/auth/register", payload);
    const apiData = res.data;

    if (!apiData.success) {
      return {
        errorMessage: apiData.errors?.[0]?.message || "Invalid email or password"
      };
    }

    return;

  } catch (err) {
    return {
      errorMessage:
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Login failed"
    };
  }
};
