import { StudentInClass } from "../../services/api/class/getClassById/dto";

function StudentList({ studentList }: { studentList: StudentInClass[] }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Students</h2>
        <span className="text-sm text-gray-500">{studentList.length}</span>
      </div>

      <ul className="space-y-3 h-[416px] overflow-y-auto pr-2">
        {studentList.map((student, i) => (
          <li
            key={i}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-[#4167cd] text-white flex items-center justify-center font-bold">
              S{i + 1}
              {student.avatar}
            </div>
            <div>
              <p className="font-semibold">{student.fullName}</p>
              <p className="text-sm text-gray-500">{student.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
