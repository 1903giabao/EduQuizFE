import { ApiResponse } from "../../../../../types/api-response";
import axiosClient from "../../../axiosClient";
import {
  GetClassSlotResponse,
  GetClassSlotPayload,
  GetClassSlotResult,
} from "./dto";
import dayjs from "dayjs";

async function GetClassSlot({
  studentId,
  teacherId,
  date,
  startDate,
  endDate,
}: GetClassSlotPayload): Promise<GetClassSlotResult> {
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
        data: [
          {
            id: null,
            className: null,
            location: null,
            classDescription: null,
            teacherName: null,
            startTime: null,
            endTime: null,
          },
        ],
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
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: [
        {
          id: null,
          className: null,
          location: null,
          classDescription: null,
          teacherName: null,
          startTime: null,
          endTime: null,
        },
      ],
      errorMessage: error.message || "Fail to get class slots",
    };
  }
}

export default GetClassSlot;
