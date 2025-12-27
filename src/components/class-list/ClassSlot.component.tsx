import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlot/dto";

const IMG_LIST = ["calm", "energetic", "excited", "fast", "friendly", "honest", "smart"];

function getRandomImage(id?: string | number) {
  if (!id) return IMG_LIST[0];
  const index =
    Math.abs(
      id
        .toString()
        .split("")
        .reduce((acc, c) => acc + c.charCodeAt(0), 0)
    ) % IMG_LIST.length;

  return IMG_LIST[index];
}

function ClassSlot({ slot }: { slot: ClassSlotResult }) {
  if (!slot) return null;

  const randomImage = getRandomImage(slot.id);

  return (
    <div
      className="
        my-4 h-44 grid grid-cols-4 items-center
        text-sm text-gray-800
        border border-[#4167cd]/40
        rounded-3xl p-4
        bg-[#c4cff3]
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        hover:shadow-[0_10px_24px_rgba(65,103,205,0.25)]
        hover:border-[#4167cd]
        cursor-pointer
      "
      // style={{ backgroundColor: bgColor }}
    >
      <div className="px-2 flex items-center justify-center">
        <img src={`/${randomImage}.png`} alt="Take a break Image" />
      </div>

      <div className="px-4 py-2 col-span-2 flex flex-col h-full">
        <div className="space-y-1">
          <div className="text-xl text-center font-semibold text-[#1f2d5a]">
            {slot.className}
          </div>

          <div className="line-clamp-2 text-gray-600 leading-relaxed">
            {slot.classDescription}
          </div>

          <div className="grid grid-cols-3 mt-2 text-xs text-gray-500">
            <div>{slot.location}</div>
            <div>{slot.classTime}</div>
          </div>
        </div>

        <div className="mt-auto pt-2 text-sm">
          Teacher:&nbsp;
          <span className="text-[#4167cd] font-semibold hover:underline">
            {slot.teacherName}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ClassSlot;
