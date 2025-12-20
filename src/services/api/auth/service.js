import axiosClient from "../axiosClient"

export const login = async (email, password) => {
  try {
    const res = await axiosClient.post("/auth/login", { email, password });

    const apiData = res.data;

    if (!apiData.success) {
      throw new Error(apiData.errors?.[0]?.message || "Login failed");
    }

    const { token, role, accountId } = apiData.data;

    localStorage.setItem("accessToken", token.accessToken);
    localStorage.setItem("role", role);

    return {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      role,
      accountId,
    };
  } catch (err) {
    throw new Error(err.response?.data?.errors?.[0]?.message || err.message);
  }
};
