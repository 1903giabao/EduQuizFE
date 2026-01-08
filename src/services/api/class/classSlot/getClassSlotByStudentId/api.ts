import { ApiResponse } from "../../../../../types/api-response";
import axiosClient from "../../../axiosClient";
import {
  GetClassSlotResponse,
  GetClassSlotResult,
  GetClassSlotByStudentIdPayload,
} from "./dto";

async function GetClassSlotByStudentId({
  studentId,
  teacherId,
  date,
  startDate,
  endDate,
}: GetClassSlotByStudentIdPayload): Promise<GetClassSlotResult> {
  try {
    const params: Record<string, string> = {};

    if (date !== null) {
      params.date = date;
    }

    if (startDate !== null) {
      params.startDate = startDate;
    }

    if (endDate !== null) {
      params.endDate = endDate;
    }

    if (teacherId !== null) {
      params.teacherId = teacherId;
    }

    const res = await axiosClient.get<ApiResponse<GetClassSlotResponse[]>>(
      `/class-slots/student/${studentId}`,
      { params }
    );

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        meta: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to get class slots",
      };
    }

    return {
      data: apiData.data?.map((slot) => ({
        id: slot.id,
        className: slot.className,
        classDescription: slot.description,
        location: slot.location,
        teacherName: slot.teacherName,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
      meta: apiData.meta,
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: null,
      meta: null,
      errorMessage: error.message || "Fail to get class slots",
    };
  }
}

export default GetClassSlotByStudentId;
