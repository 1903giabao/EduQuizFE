export type GetClassSlotPayload = {
  studentId: string;
  teacherId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
};

export type GetClassSlotResponse = {
  id: string;
  className: string;
  teacherName: string;
  description: string;
  location: string;
  startTime: Date | null;
  endTime: Date | null;
};

export type GetClassSlotResult = {
  data: ClassSlotResult[];
  errorMessage: string;
};

export type ClassSlotResult = {
  id: string;
  className: string;
  teacherName: string;
  classDescription: string;
  startTime: Date;
  endTime: Date;
  location: string;
};
