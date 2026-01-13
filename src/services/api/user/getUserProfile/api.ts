import { ApiResponse } from "../../../../types/api-response";
import axiosClient from "../../axiosClient";
import {
  GetUserProfilePayload,
  GetUserProfileResponse,
  GetUserProfileResult,
} from "./dto";

async function GetUserProfile({
  id,
}: GetUserProfilePayload): Promise<GetUserProfileResult> {
  try {
    const res = await axiosClient.get<ApiResponse<GetUserProfileResponse>>(
      `accounts/profile/${id}`
    );

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to get class",
      };
    }

    return {
      data: apiData?.data,
      errorMessage: null,
    };
  } catch (err) {
    return {
      data: null,
      errorMessage: "Network error",
    };
  }
}

export default GetUserProfile;
