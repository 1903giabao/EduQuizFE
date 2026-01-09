import { ClassStatus } from "../../../../types/class";
import { WeekDay } from "../../../../types/common";

export type GetClassByIdPayload = {
  classId: string;
};

export type GetClassByIdResult = {
    data: GetClassByIdResponse;
    errorMessage: string;
}

export type GetClassByIdResponse = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  teacherId?: string | null;
  teacherName?: string | null; 
  status: ClassStatus;
  numOfStudents: number;
  locations: string[];
  schedules: WeekDay[];

  studentInClasses: StudentInClass[];
  quizOfClasses: QuizOfClass[];
  scheduleOfClasses: ScheduleOfClass[];
};

export type StudentInClass = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar?: string | null;
};

export type QuizOfClass = {
  title: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  durationMinutes: number;
};

export type ScheduleOfClass = {
  day: WeekDay;
  location: string;
  startTime: string;
  endTime: string;
};

