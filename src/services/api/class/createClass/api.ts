import { ApiResponse } from "../../../../types/api-response";
import axiosClient from "../../axiosClient";
import { CreateClassPayload, GetClassSlotResult } from "./dto";

async function CreateClass({
  name,
  description,
  teacherId,
  startDate,
  endDate,
  slotInDays,
}: CreateClassPayload): Promise<GetClassSlotResult> {
  try {
    const res = await axiosClient.post<ApiResponse<null>>("classes", {
      name,
      description,
      teacherId,
      startDate,
      endDate,
      slotInDays
    });

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to create class",
      };
    }

    return {
      data: "Create class succeeded",
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      errorMessage: error.message || "Fail to create class",
    };
  }
}

export default CreateClass;
