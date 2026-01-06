import dayjs from "dayjs";
import { ClassResult } from "../../services/api/class/getClasses/dto";

function Class({ classData }: { classData: ClassResult }) {
  return (
    <div
      className="
        my-4 mx-16 grid grid-cols-3
        text-sm text-gray-800
        rounded-3xl p-4
        bg-white
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-[0_10px_24px_rgba(65,103,205,0.25)]
        hover:border-[#4167cd]
        cursor-pointer
      "
    >
      <div className="px-2 flex items-center justify-center">
        <img
          className="w-72 h-auto"
          src={`/student_girl.png`}
          alt="Take a break Image"
        />
      </div>
      <div className="flex flex-col gap-2 text-lg">
        <div className="text-2xl text-center font-semibold text-[#00adef]">
          {classData.name}
        </div>

        <div>
          <span className="font-semibold">Location: </span>
          {classData.status}
        </div>
        <div className="">
          <span className="font-semibold">Teacher: </span>
          <span>{classData.teacherName}</span>
        </div>
      </div>
      <div className="mt-8 text-lg font-bold text-red-600">
        <span>Note: </span>
        {classData.description &&
          classData.description.split(" ").slice(0, 5).join(" ")}
        ...
      </div>
    </div>
  );
}

export default Class;
