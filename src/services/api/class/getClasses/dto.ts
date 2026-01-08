import { ApiMeta } from "../../../../types/api-response";

export type GetClassesPayload = {
  teacherIds?: string;
  studentIds?: string;
  status?: string;
  keyword?: string;
  page?: string;
  pageSize?: string;
};

export type GetClassesResponse = {
  id: string;
  name: string;
  description: string | null;
  createAt: Date;
  teacherId: string | null;
  teacherName: string | null;
  status: string;
  numOfStudents: number;
};

export type GetClassesResult = {
  data: ClassResult[];
  meta: ApiMeta;
  errorMessage: string;
};

export type ClassResult = {
  id: string;
  name: string;
  description: string;
  createAt: Date;
  teacherId: string;
  teacherName: string;
  status: string;
  numOfStudents: number;
};
