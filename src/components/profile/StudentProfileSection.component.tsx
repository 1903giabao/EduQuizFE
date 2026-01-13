import dayjs from "dayjs";
import { GetUserProfileResponse } from "../../services/api/user/getUserProfile/dto";

function StudentProfileSection({
  profile,
}: {
  profile: GetUserProfileResponse;
}) {
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Learning Overview</h2>

        <div className="grid grid-cols-3 gap-4 text-center text-lg">
          <div>
            <p className="text-gray-500">Classes</p>
            <p className="font-bold">{profile.enrolledClassesCount ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Quizzes Done</p>
            <p className="font-bold">{profile.completedQuizzesCount ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Quizzes To Do</p>
            <p className="font-bold">{profile.toDoQuizzesCount ?? 0}</p>
          </div>
        </div>
      </div>

      {profile.classSchedule && (
        <div className="max-h-72 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Class Schedule</h2>

          <div className="grid grid-cols-[1fr_1fr_3fr_1fr] gap-4 text-sm text-gray-500 border-b pb-2 mb-3">
            <span>Name</span>
            <span>Teacher</span>
            <span>Schedule</span>
            <span>Location</span>
          </div>

          <div className="grid grid-cols-[1fr_1fr_3fr_1fr] gap-4 items-center">
            {profile.classSchedule.map((schedule, i) => (
              <>
                <span className="font-semibold truncate">
                  {schedule.className}
                </span>

                <span className="font-semibold truncate">
                  {schedule.teacherName}
                </span>

                <span className="truncate">
                  {schedule.times.join(" / ")}
                </span>

                <span className="text-gray-500 truncate">
                  {schedule.location.join(" / ")}
                </span>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default StudentProfileSection;
