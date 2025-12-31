import Calendar from "../../components/calendar/Calendar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import Schedule from "../../components/schedule/Schedule";
import { useEffect, useMemo, useState } from "react";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlot/dto";
import GetClassSlot from "../../services/api/class/classSlot/getClassSlot/api";
import { useGetWeekDate } from "../../hooks/calendar/useGetWeekDate";
import dayjs from "dayjs";

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
      <div className="w-64">
        <SideBar />
      </div>

      <div className="mt-12 flex-1">
        <div className="text-center mt-12 text-4xl font-bold">
          {curDate.toLocaleString("en-US", { month: "long" })} {curDate.getFullYear().toString()}
        </div>
        <div className="relative max-h-[600px] overflow-auto p-6 mt-2">
          <Schedule slots={classSlots} startDateOfWeek={startDateOfWeek} />
        </div>
      </div>
      <div className="my-12 rounded-s-3xl flex-2 p-8 bg-white">
        <Calendar
          onSelectDate={(date) => setCurDate(date)}
          isSelectWeek={true}
        />
      </div>
    </div>
  );
}

export default SchedulePage;
