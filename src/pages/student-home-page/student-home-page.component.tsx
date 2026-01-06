import { useNavigate } from "react-router-dom";
import SideBar from "../../components/side-bar/side-bar.component";
import Calendar from "../../components/calendar/Calendar.component";
import ClassSlotList from "../../components/class-slot-list/ClassSlotList.component";
import { useState } from "react";
import HeaderBar from "../../components/header/HeaderBar.component";
import dayjs from "dayjs";

function StudentHomePage() {
  const [curDate, setCurDate] = useState(new Date());
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="absolute -z-10 left-60 w-[calc(100%-15rem)]">
        <HeaderBar title="Upcoming class" />
      </div>
      <div className="w-64">
        <SideBar />
      </div>
      <div className="flex-1 mt-12 p-6">
        <div className="text-center mt-8 mb-8 text-4xl font-bold text-[#00adef]">
          My classes in {curDate && dayjs(curDate).format("DD/MM/YYYY")}
        </div>
        <ClassSlotList date={curDate} />
      </div>
      <div className="mt-24 rounded-ss-3xl flex-2 p-8 bg-white">
        <Calendar onSelectDate={(date) => setCurDate(date)} />
      </div>
    </div>
  );
}

export default StudentHomePage;
