import ClassSlot from "./ClassSlot.component";

function ClassSlotList({ date }: Props) {
  return (
    <div className="w-full bg-gray-200 rounded-lg border-4 border-gray-600 shadow-lg p-4">
      <div className="text-center">Your slot in {date && date.toDateString()}</div>
      <ClassSlot />
      <ClassSlot />
    </div>
  );
}

type Props = {
  date: Date;
};

export default ClassSlotList;
