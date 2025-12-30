import { useEffect, useState } from "react";
import { useGetWeekDate } from "../../hooks/calendar/useGetWeekDate";

const WEEK_DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const today = new Date();

function Calendar({ onSelectDate, isSelectWeek = false }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedWeek, setSelectedWeek] = useState<Date[] | null>(useGetWeekDate(currentDate));
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  let firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();
  firstDayInMonth = firstDayInMonth == 0 ? 7 : firstDayInMonth;
  const lastDayInMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const previousMonth = new Date(currentYear, currentMonth, 0);

  const nextMonth = new Date(currentYear, currentMonth + 1, 1);

  const leadingDaysCount = firstDayInMonth - 1;

  function onChangeMonth(value: number) {
    setCurrentDate(new Date(currentYear, currentMonth + value, 1));
  }

  function onChooseDate(date: Date) {
    const newDate = new Date(date);

    if (isSelectWeek) {
      setSelectedWeek(useGetWeekDate(newDate));
    }

    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    if (month < currentMonth && year === currentYear) {
      onChangeMonth(-1);
    } else if (month < currentMonth && year > currentYear) {
      onChangeMonth(1);
    } else if (month > currentMonth && year === currentYear) {
      onChangeMonth(1);
    } else if (month > currentMonth && year < currentYear) {
      onChangeMonth(-1);
    }

    if (newDate.toISOString() != selectedDate.toISOString()) {
      setSelectedDate(newDate);
    }
  }

  function isSameDate(day: number, selectedDate: Date) {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  }

  function isInSelectedWeek(cellDate: Date) {
    return selectedWeek?.some(
      (d) =>
        d.getDate() === cellDate.getDate() &&
        d.getMonth() === cellDate.getMonth() &&
        d.getFullYear() === cellDate.getFullYear()
    );
  }

  const getWeekRoundedClass = (date: Date) => {
    if (!isSelectWeek || !isInSelectedWeek(date)) return "";

    if (date.getDay() === 1) return "rounded-l-full";
    if (date.getDay() === 0) return "rounded-r-full";

    return "bg-blue-300";
  };

  useEffect(() => {
    onSelectDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-80 bg-blue-50 text-black p-4 rounded-xl border-2 border-blue4167cd">
      <div className="flex flex-row justify-between gap-2 px-6">
        <button
          onClick={() => {
            onChangeMonth(-1);
          }}
        >
          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-transparent border-r-blue4167cd"></div>
        </button>
        <h2 className="text-center font-semibold text-lg text-blue4167cd">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => {
            onChangeMonth(1);
          }}
        >
          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-blue4167cd"></div>
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-sm text-gray-500">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center">
        {Array.from({ length: leadingDaysCount }).map((_, i) => {
          const startDay = previousMonth.getDate() - leadingDaysCount + 1;
          const day = startDay + i;
          const cellDate = new Date(
            previousMonth.getFullYear(),
            previousMonth.getMonth(),
            day
          );
          const isSelected = isSelectWeek && isInSelectedWeek(cellDate);
          return (
            <div key={i} className="relative h-9">
              {isSelected && (
                <div
                  className={`absolute inset-y-0 inset-x-[-4px]
                  ${getWeekRoundedClass(cellDate)}
                `}
                />
              )}

              <button
                className={`relative z-10 mt-[6px] rounded-full text-gray-400
                  ${isSelected && "bg-blue-300 text-white"} `}
                key={i}
                onClick={() => onChooseDate(cellDate)}
              >
                {day}
              </button>
            </div>
          );
        })}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const cellDate = new Date(currentYear, currentMonth, day);
          const isCurrentDate =
            day === today.getDate() &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
          const isSelectedDate = isSameDate(day, selectedDate);
          const isSelected = isSelectWeek
            ? isInSelectedWeek(cellDate)
            : isSameDate(day, selectedDate);
          return (
            <div key={day} className="relative h-9">
              {isSelected && (
                <div
                  className={`absolute inset-y-0 inset-x-[-4px]
                  ${getWeekRoundedClass(cellDate)}
                `}
                />
              )}

              <button
                key={day}
                className={`relative z-10 w-full h-9 rounded-full hover:bg-blue4167cd hover:text-white ${
                  isCurrentDate && "border border-blue4167cd"
                } ${!isSelectedDate && isSelected && "bg-blue-300 text-white"} 
                ${getWeekRoundedClass(cellDate)}
                ${isSelectedDate && "bg-blue4167cd text-white"} `}
                onClick={() => onChooseDate(cellDate)}
              >
                {day}
              </button>
            </div>
          );
        })}
        {Array.from({
          length: 7 - lastDayInMonth == 7 ? 0 : 7 - lastDayInMonth,
        }).map((_, i) => {
          const day = i + 1;
          const cellDate = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            day
          );
          const isSelected = isSelectWeek && isInSelectedWeek(cellDate);
          return (
            <div key={i} className="relative h-9">
              {isSelected && (
                <div
                  className={`absolute inset-y-0 inset-x-[-4px]
                  ${getWeekRoundedClass(cellDate)}
                `}
                />
              )}

              <button
                className={`relative z-10 mt-[6px] rounded-full text-gray-400
                  ${isSelected && "bg-blue-300 text-white"} `}
                key={i}
                onClick={() => onChooseDate(cellDate)}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  onSelectDate: (date: Date) => void;
  isSelectWeek?: boolean;
};

export default Calendar;
