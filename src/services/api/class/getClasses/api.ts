import { ApiResponse } from "../../../../types/api-response";
import axiosClient from "../../axiosClient";

async function GetClasses({
  teacherIds,
  studentIds,
  status,
  keyword,
  page,
  pageSize,
}: GetClassesPayload): Promise<GetClassesResult> {
  try {
    const params: Record<string, string> = {};

    if (teacherIds !== null) {
      params.teacherIds = teacherIds;
    }
    if (studentIds !== null) {
      params.studentIds = studentIds;
    }
    if (status !== null) {
      params.status = status;
    }
    if (keyword !== null) {
      params.keyword = keyword;
    }
    if (page !== null) {
      params.page = page;
    }
    if (pageSize !== null) {
      params.pageSize = pageSize;
    }

    const res = await axiosClient.get<ApiResponse<GetClassesResponse[]>>(
      "classes",
      { params }
    );

    const apiData = res.data;

    if (!apiData?.success) {
      return {
        data: null,
        errorMessage: apiData.errors?.[0]?.message || "Fail to get classes",
      };
    }

    return {
      data: apiData?.data.map((cl) => ({
        id: cl.id,
        name: cl.name,
        description: cl.description,
        createAt: cl.createAt,
        status: cl.status,
        teacherId: cl.teacherId,
        teacherName: cl.teacherName,
      })),
      errorMessage: null,
    };
  } catch (err) {
    return {
      data: null,
      errorMessage: err.message || "Fail to get classes",
    };
  }
}

export default GetClasses;
