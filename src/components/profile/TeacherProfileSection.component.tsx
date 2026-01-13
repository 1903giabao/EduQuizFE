import dayjs from "dayjs";
import { GetUserProfileResponse } from "../../services/api/user/getUserProfile/dto";

function TeacherProfileSection({
  profile,
}: {
  profile: GetUserProfileResponse;
}) {
  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Teaching Overview</h2>

        <div className="grid grid-cols-4 gap-4 text-center text-lg">
          <div>
            <p className="text-gray-500">Classes</p>
            <p className="font-bold">{profile.teachingClassesCount ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Students</p>
            <p className="font-bold">{profile.studentsCount ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Published</p>
            <p className="font-bold">{profile.publishedClassesCount ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500">Draft / Unpublished</p>
            <p className="font-bold">{profile.publishedClassesCount ?? 0}</p>
          </div>
        </div>
      </div>

      {profile.classSchedule && (
        <div className="max-h-72 bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Class Schedule</h2>

          <div className="grid grid-cols-[1fr_1fr_3fr_1fr] gap-4 text-sm text-gray-500 border-b pb-2 mb-3">
            <span className="col-span-2">Name</span>
            <span>Schedule</span>
            <span>Location</span>
          </div>

          <div className="grid grid-cols-[1fr_1fr_3fr_1fr] gap-4 items-center">
            {profile.classSchedule.map((schedule, i) => (
              <>
                <span className="col-span-2 font-semibold truncate">
                  {schedule.className}
                </span>

                <span className="truncate">{schedule.times.join(" / ")}</span>

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

export default TeacherProfileSection;
