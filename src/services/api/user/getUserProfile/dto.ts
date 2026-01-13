import { Role } from "../../../../types/role";

export type GetUserProfilePayload = {
  id: string;
};

export type GetUserProfileResult = {
  data: GetUserProfileResponse;
  errorMessage: string;
};

export type GetUserProfileResponse = {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string | null;
  parentPhoneNumber?: string | null;
  school?: string | null;
  bio?: string | null;
  department?: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  classSchedule?: ClassSchedule[];

  // Teacher info
  teachingClassesCount?: number;
  studentsCount?: number;
  publishedClassesCount?: number;
  nonPublishedClassesCount?: number;

  // Student info
  enrolledClassesCount?: number;
  completedQuizzesCount?: number;
  toDoQuizzesCount?: number;
};

export type ClassSchedule = {
  className: string;
  teacherName: string;
  times: string[];
  location: string[];
};
