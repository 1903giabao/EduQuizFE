import dayjs from "dayjs";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlot/dto";

function ClassSlot({ slot }: { slot: ClassSlotResult }) {
  if (!slot) return null;

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
          {slot.className}
        </div>

        <div>
          <span className="font-semibold">Location: </span>
          {slot.location}
        </div>
        <div>
          <span className="font-semibold">Time: </span>
          {`${dayjs(new Date(slot.startTime)).format("HH:mm")} - ${dayjs(
            new Date(slot.endTime)
          ).format("HH:mm")}`}
        </div>
        <div className="">
          <span className="font-semibold">Teacher: </span>
          <span>{slot.teacherName}</span>
        </div>
      </div>
      <div className="mt-8 text-lg font-bold text-red-600">
        <span>Note: </span>
        {slot.classDescription && slot.classDescription.split(" ").slice(0, 5).join(" ")}...
      </div>
    </div>
  );
}

export default ClassSlot;
