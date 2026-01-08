export type CreateClassPayload = {
  name: string;
  description?: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  slotInDays: SlotInDay[];
};

export type SlotInDay = {
  day: number;
  startSlotTime: string;
  endSlotTime: string;
  location: string;
};

export type GetClassSlotResult = {
  data: string;
  errorMessage: string;
};
