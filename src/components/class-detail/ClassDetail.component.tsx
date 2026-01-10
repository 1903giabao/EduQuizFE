import { useQuery } from "@tanstack/react-query";
import QuizList from "../quiz-list/QuizList.component";
import ScheduleTable from "../schedule/ScheduleTable";
import StatusBadge from "../status/StatusBadge.component";
import StudentList from "../student-list/StudentList.component";
import GetClassById from "../../services/api/class/getClassById/api";
import Loading from "../common/Loading.component";
import { ClassStatus } from "../../types/class";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../types/role";
import PublishClass from "../../services/api/class/publishClass/api";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import FullScreenLoading from "../common/FullScreenLoading.component";

function ClassDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [publishing, setPublishing] = useState<boolean>(false);
  const { data: classDetail, isLoading } = useQuery({
    queryKey: ["classes", id],
    queryFn: async () => {
      if (!id) throw new Error("Class id is missing");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await GetClassById({ classId: id });

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (!classDetail) return null;

  async function handlePublishClass() {
    if (!id) return null;

    try {
      setPublishing(true);
      const response = await PublishClass({ id });
      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }
      await queryClient.invalidateQueries({
        queryKey: ["classes"],
        exact: false,
      });
    } catch (err) {
      setError(err);
    } finally {
      setPublishing(false);
    }
  }

  if (publishing) return <FullScreenLoading />;

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#00adef]">
            {classDetail.name}
          </h1>
          <div>
            {classDetail.status && user.role === Role.Teacher && (
              <>
                <button
                  className="mr-4 px-4 py-1 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-300"
                  onClick={handlePublishClass}
                >
                  {classDetail.status !== ClassStatus.Published
                    ? `Publish`
                    : `Unpublish`}{" "}
                  this class
                </button>
                <StatusBadge status={classDetail.status} size="text-md" />
              </>
            )}
          </div>
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
          {classDetail.description || "None."}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-1">
          <StudentList studentList={classDetail.studentInClasses} />
        </div>
        <div className="col-span-2 space-y-6">
          <QuizList quizList={classDetail.quizOfClasses} />
          <ScheduleTable scheduleList={classDetail.scheduleOfClasses} />
        </div>
      </div>
    </>
  );
}

export default ClassDetail;
