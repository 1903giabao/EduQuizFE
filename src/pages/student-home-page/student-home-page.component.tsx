import { useNavigate } from "react-router-dom";
import SideBar from "../../components/side-bar/side-bar.component";
import Calendar from "../../components/calendar/Calendar.component";
import ClassSlotList from "../../components/class-list/ClassSlotList.component";
import { useState } from "react";

function StudentHomePage() {
  const [curDate, setCurDate] = useState(new Date());
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <SideBar />
      </div>

      <div className="flex-1 p-6">
        <ClassSlotList date={curDate} />
      </div>
      <div className="my-12 rounded-s-3xl flex-2 p-8 bg-blue-50">
        <Calendar onSelectDate={(date) => setCurDate(date)}/>
      </div>
    </div>
  );
}

export default StudentHomePage;
