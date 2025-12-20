import axiosClient from "./axiosClient";

export const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === "teacher@test.com") {
        return {
            token: "fake-jwt-token",
            role: "Teacher",
        }
    }

    if (email === "student@test.com") {
        return {
            token: "fake-jwt-token",
            role: "Student",
        }
    }

    throw new Error("Invalid credentials")
}