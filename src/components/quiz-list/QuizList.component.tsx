import dayjs from "dayjs";
import { QuizOfClass } from "../../services/api/class/getClassById/dto";
import StatusBadge from "../status/StatusBadge.component";

function QuizList({ quizList }: { quizList: QuizOfClass[] }) {
  function toDateTimeString(date: string) {
    var newDate = new Date(date);
    return dayjs(newDate).format("HH:mm DD/MM/YYYY")
  };
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Quizzes</h2>

      <div className="h-[144px] overflow-y-auto pr-2">
        <ul className="space-y-3">
          {quizList.map((quiz, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 rounded-lg px-2"
            >
              <div>
                <p className="font-semibold">{quiz.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {toDateTimeString(quiz.endTime)}
                </p>
              </div>
              <StatusBadge status={quiz.isActive ? "OPENED" : "CLOSED"} size="text-sm"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QuizList;
