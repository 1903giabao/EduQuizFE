import Calendar from "../../components/calendar/Calendar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import Schedule from "../../components/schedule/Schedule";
import { useEffect, useMemo, useState } from "react";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlot/dto";
import GetClassSlot from "../../services/api/class/classSlot/getClassSlot/api";
import { useGetWeekDate } from "../../hooks/calendar/useGetWeekDate";
import dayjs from "dayjs";
import HeaderBar from "../../components/header/HeaderBar.component";

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SchedulePage() {
  const [error, setError] = useState("");
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [classSlots, setClassSlots] = useState<ClassSlotResult[]>([]);
  const studentId = localStorage.getItem("accountId");
  const teacherId = null;

  const curWeek = useMemo(() => useGetWeekDate(curDate), [curDate]);

  const startDateOfWeek = curWeek?.[0];
  const endDateOfWeek = curWeek?.[6];
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const startDateString = dayjs(startDateOfWeek).format("YYYY-MM-DD");
        const endDateString = dayjs(endDateOfWeek).format("YYYY-MM-DD");
        const response = await GetClassSlot({
          studentId,
          teacherId,
          startDate: startDateString,
          endDate: endDateString,
        });

        if (response.errorMessage) {
          setError(response.errorMessage);
        }

        setClassSlots(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchSlots();
  }, [studentId, teacherId, startDateOfWeek, endDateOfWeek]);

  return (
    <div className="flex h-screen">
      <div className="absolute -z-10 left-60 w-[calc(100%-15rem)]">
        <HeaderBar title="Schedule board" />
      </div>

      <div className="w-64">
        <SideBar />
      </div>

      <div className="mt-12 flex-1">
        <div className="text-center mt-12 text-4xl font-bold">
          {curDate.toLocaleString("en-US", { month: "long" })} {curDate.getFullYear().toString()}
        </div>

        <div className="relative mt-6 max-h-[740px] overflow-auto p-6">
          <Schedule slots={classSlots} startDateOfWeek={startDateOfWeek} curDate={curDate} />
        </div>
      </div>
      <div className="mt-24 rounded-ss-3xl flex-2 p-8 bg-white">
        <Calendar
          onSelectDate={(date) => setCurDate(date)}
          isSelectWeek={true}
        />
      </div>
    </div>
  );
}

export default SchedulePage;
