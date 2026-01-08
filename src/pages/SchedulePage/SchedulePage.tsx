import Calendar from "../../components/calendar/Calendar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import Schedule from "../../components/schedule/Schedule";
import { useEffect, useMemo, useState } from "react";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlotByStudentId/dto";
import { useGetWeekDate } from "../../hooks/calendar/useGetWeekDate";
import dayjs from "dayjs";
import HeaderBar from "../../components/header/HeaderBar.component";
import ClassSlotList from "../../components/class-slot-list/ClassSlotList.component";
import { Role } from "../../types/role";
import { useAuth } from "../../context/AuthContext";
import GetClassSlotByTeacherId from "../../services/api/class/classSlot/getClassSlotByTeacherId/api";

function SchedulePage() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [curDate, setCurDate] = useState<Date>(new Date());
  const [classSlots, setClassSlots] = useState<ClassSlotResult[]>([]);
  const teacherId = user.id;
  const role = user.role;

  const curWeek = useMemo(() => useGetWeekDate(curDate), [curDate]);

  const startDateOfWeek = curWeek?.[0];
  const endDateOfWeek = curWeek?.[6];
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const startDateString = dayjs(startDateOfWeek).format("YYYY-MM-DD");
        const endDateString = dayjs(endDateOfWeek).format("YYYY-MM-DD");
        const response = await GetClassSlotByTeacherId({
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
  }, [teacherId, startDateOfWeek, endDateOfWeek]);

  function renderBaseOnRole(role: string) {
    switch (role) {
      case Role.Teacher: {
        return (
          <div className="mt-12 flex-1">
            <div className="text-center mt-12 text-4xl font-bold">
              {curDate.toLocaleString("en-US", { month: "long" })}{" "}
              {curDate.getFullYear().toString()}
            </div>

            <div className="relative mt-6 max-h-[740px] overflow-auto p-6">
              <Schedule
                slots={classSlots}
                startDateOfWeek={startDateOfWeek}
                curDate={curDate}
              />
            </div>
          </div>
        );
      }
      case Role.Student: {
        return (
          <div className="flex-1 mt-12 p-6">
            <div className="text-center mt-8 mb-8 text-4xl font-bold text-[#00adef]">
              My classes in {curDate && dayjs(curDate).format("DD/MM/YYYY")}
            </div>
            <ClassSlotList date={curDate} />
          </div>
        );
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="absolute -z-10 left-60 w-[calc(100%-15rem)]">
        <HeaderBar title="Schedule board" />
      </div>

      <div className="w-64">
        <SideBar />
      </div>
      {renderBaseOnRole(role)}
      <div className="mt-24 rounded-ss-3xl flex-2 p-8 bg-white">
        <Calendar
          onSelectDate={(date) => setCurDate(date)}
          isSelectWeek={role && role === Role.Teacher}
        />
      </div>
    </div>
  );
}

export default SchedulePage;
