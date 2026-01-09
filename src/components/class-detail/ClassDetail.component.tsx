import { GetClassByIdResponse } from "../../services/api/class/getClassById/dto";
import QuizList from "../quiz-list/QuizList.component";
import ScheduleTable from "../schedule/ScheduleTable";
import StatusBadge from "../status/StatusBadge.component";
import StudentList from "../student-list/StudentList.component";

function ClassDetail({ classDetail }: { classDetail: GetClassByIdResponse}) {
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#00adef]">Mathematics 101</h1>
          <StatusBadge status={classDetail.status} size="text-md" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 text-lg">
          <div>
            <p className="text-gray-500">Teacher</p>
            <p className="font-semibold">{classDetail.teacherName}</p>
          </div>
          <div>
            <p className="text-gray-500">Number of students</p>
            <p className="font-semibold">{classDetail.numOfStudents}</p>
          </div>
          <div>
            <p className="text-gray-500">Schedule</p>
            <p className="font-semibold">{classDetail.schedules.join(" • ")}</p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-semibold">{classDetail.locations.join(" - ")}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {classDetail.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <StudentList studentList={classDetail.studentInClasses}/>
        </div>
        <div className="col-span-2 space-y-6">
          <QuizList quizList={classDetail.quizOfClasses}/>
          <ScheduleTable scheduleList={classDetail.scheduleOfClasses}/>
        </div>
      </div>
    </>
  );
}

export default ClassDetail;
