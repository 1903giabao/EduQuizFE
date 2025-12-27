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
}: GetClassSlotPayload): Promise<GetClassSlotResult> {
  try {
    const params: Record<string, string> = {};

    if (date !== null) {
      params.date = date;
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
            classTime: null,
            location: null,
            classDescription: null,
            teacherName: null,
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
        classTime:
          slot.startTime && slot.endTime
            ? `${dayjs(slot.startTime).format("HH:mm")} - ${dayjs(
                slot.endTime
              ).format("HH:mm")}`
            : null,
      })),
      errorMessage: null,
    };
  } catch (error) {
    return {
      data: [
        {
          id: null,
          className: null,
          classTime: null,
          location: null,
          classDescription: null,
          teacherName: null,
        },
      ],
      errorMessage: error.message || "Fail to get class slots",
    };
  }
}

export default GetClassSlot;
