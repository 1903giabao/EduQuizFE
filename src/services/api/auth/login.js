import axiosClient from "../axiosClient";

export const login = async (email, password) => {
  try {
    const res = await axiosClient.post("/auth/login", { email, password });
    const apiData = res.data;

    if (!apiData.success) {
      return {
        errorMessage: apiData.errors?.[0]?.message || "Invalid email or password"
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
      errorMessage: null
    };

  } catch (err) {
    return {
      errorMessage:
        err.response?.data?.errors?.[0]?.message ||
        err.message ||
        "Login failed"
    };
  }
};
