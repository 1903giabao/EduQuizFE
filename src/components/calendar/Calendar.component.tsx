import { useEffect, useState } from "react";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const today = new Date();

function Calendar({ onSelectDate }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  function onChangeMonth(value: number) {
    setCurrentDate(new Date(currentYear, currentMonth + value, 1));
  }

  function onChooseDate(day: number) {
    let newDate = new Date(currentYear, currentMonth, day);
    if (newDate.toISOString() != selectedDate.toISOString()) {
      setSelectedDate(newDate);
    }
  }

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
        {Array.from({ length: firstDayInMonth }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isCurrentDate =
            day === today.getDate() &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;
          const isSelectedDate =
            selectedDate &&
            day === selectedDate.getDate() &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;
          return (
            <button
              key={day}
              className={`h-9 rounded-full hover:bg-blue4167cd hover:text-white ${
                isCurrentDate && "border border-blue4167cd"
              } ${isSelectedDate && "bg-blue4167cd text-white"}`}
              onClick={() => onChooseDate(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type Props = {
  onSelectDate: (date: Date) => void;
};

export default Calendar;
