import dayjs from "dayjs";
import {
  timeToMinutes,
  useGenerateTimes,
} from "../../hooks/schedule/useGenerateTimes";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlotByStudentId/dto";

const DAYS_IN_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const today = new Date();

function Schedule({
  slots,
  startDateOfWeek,
  curDate,
  startTime = "08:00",
  endTime = "23:00",
  stepMinutes = 30,
}: Props) {
  const times = useGenerateTimes(startTime, endTime, 60);

  const getRowStart = (time: string) => {
    return (timeToMinutes(time) - timeToMinutes(startTime)) / stepMinutes + 2;
  };

  const getRowSpan = (start: string, end: string) => {
    return (timeToMinutes(end) - timeToMinutes(start)) / stepMinutes;
  };

  const calculateWeekDates = (date: Date) => {
    let weekDates: number[] = [];
    let d = new Date(date);
    Array.from({ length: 7 }, (_, i) => {
      const newDay = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      weekDates.push(newDay.getDate());
    });

    return weekDates;
  };

  const weekDates = calculateWeekDates(startDateOfWeek);

  return (
    <div className="relative">
      <div className="grid grid-cols-[80px_repeat(7,1fr)] auto-rows-[60px] rounded-3xl bg-white">
        <div />

        {DAYS_IN_WEEK.map((day, i) => {
          const targetDate = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            weekDates[i]
          );

          const isToday =
            today.getFullYear() === targetDate.getFullYear() &&
            today.getMonth() === targetDate.getMonth() &&
            today.getDate() === targetDate.getDate();

          return (
            <div
              key={day}
              className={`border-l border-blue-100 ${
                isToday && "text-red-700 bg-blue-50"
              }`}
            >
              <div className="text-center text-2xl font-bold text-black">
                {weekDates[i]}
              </div>
              <div className="text-center font-medium text-gray-600">{day}</div>
            </div>
          );
        })}

        {times.map((time) => (
          <div key={time} className="border-t border-blue-100 contents">
            <div className="relative">
              <div className="absolute inset-x-4 z-10 h-6 w-11 bg-white text-center -translate-y-3">
                {time}
              </div>
              <div className="relative border-t border-blue-100"></div>
            </div>
            {DAYS_IN_WEEK.map((day, i) => {
              const targetDate = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                weekDates[i]
              );

              const isToday =
                today.getFullYear() === targetDate.getFullYear() &&
                today.getMonth() === targetDate.getMonth() &&
                today.getDate() === targetDate.getDate();

              return (
                <div
                  key={day}
                  className={`border-t border-l border-blue-100 ${
                isToday && "text-red-700 bg-blue-50"
              }`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-cols-[80px_repeat(7,1fr)] auto-rows-[30px]">
        {slots.map((slot) => {
          const start = new Date(slot.startTime);
          const end = new Date(slot.endTime);
          if (today > end) {
          }
          const dayInWeek = start.getDay() + 2;
          const rowStart = Math.floor(
            getRowStart(dayjs(start).format("HH:mm"))
          );
          const rowEnd = getRowSpan(
            dayjs(start).format("HH:mm"),
            dayjs(end).format("HH:mm")
          );
          return (
            <div
              key={slot.id}
              className={`flex flex-col m-0.5 rounded-xl p-4 text-sm ${
                today > end
                  ? `text-gray-500 bg-gray-300`
                  : ` text-white shadow bg-blue4167cd         
                  transition-transform duration-200 ease-out hover:scale-[1.1] 
                  hover:cursor-pointer 
                  hover:z-20 
                  hover:shadow-[0_10px_24px_rgba(65,103,205,0.25)]`
              }`}
              style={{
                gridColumnStart: dayInWeek - 1,
                gridRowStart: rowStart + 1,
                gridRowEnd: `span ${rowEnd}`,
              }}
            >
              <div className="text-md font-bold">{slot.className}</div>
              <div className="text-sm font-semibold">{slot.location}</div>
              <div className="mt-auto">
                <span>{`${dayjs(new Date(slot.startTime)).format(
                  "HH:mm"
                )} - ${dayjs(new Date(slot.endTime)).format("HH:mm")}`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type Props = {
  slots: ClassSlotResult[];
  startDateOfWeek: Date;
  curDate: Date;
  startTime?: string;
  endTime?: string;
  stepMinutes?: number;
};

export default Schedule;
