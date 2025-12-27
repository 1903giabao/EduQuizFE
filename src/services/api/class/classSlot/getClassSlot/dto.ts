export type GetClassSlotPayload = {
  studentId: string;
  teacherId?: string;
  date?: string;
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
  classTime: string;
  location: string;
};
