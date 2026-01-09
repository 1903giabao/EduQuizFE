import { ApiResponse } from "../../../../types/api-response";
import axiosClient from "../../axiosClient";
import {
  GetClassByIdPayload,
  GetClassByIdResponse,
  GetClassByIdResult,
} from "./dto";

async function GetClassById({
  classId,
}: GetClassByIdPayload): Promise<GetClassByIdResult> {
  try {
    const res = await axiosClient.get<ApiResponse<GetClassByIdResponse>>(
      `classes/${classId}`
    );

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to get class",
      };
    }

    return {
      data: apiData.data,
      errorMessage: null,
    };
  } catch (err) {
    return {
      data: null,
      errorMessage: "Network error",
    };
  }
}

export default GetClassById;
