import { PublishClassPayload, PublishClassResult } from "./dto";
import axiosClient from "../../axiosClient";
import { ApiResponse } from "../../../../types/api-response";

async function PublishClass({
  id,
}: PublishClassPayload): Promise<PublishClassResult> {
  try {
    const res = await axiosClient.put<ApiResponse<null>>(
      `classes/${id}/publish`
    );

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to publish class",
      };
    }
    return {
      data: "Publish class succeeded",
      errorMessage: null,
    };
  } catch (err) {
    return {
      data: null,
      errorMessage: err.message || "Fail to publish class",
    };
  }
}

export default PublishClass;
