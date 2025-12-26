function ClassSlot() {
  return (
    <div className="my-4 grid grid-cols-3 justify-around border-2 border-gray-900 rounded-[32px] p-4">
      <div>Image</div>
      <div>
        <div className="text-xl font-bold">ClassName</div>
        <div>TeacherName</div>
        <div>ClassSlotDescription</div>
        <div className="flex flex-row justify-between">
          <div>ClassSlotLocation</div>
          <div>ClassSlotTime</div>
        </div>
      </div>
    </div>
  );
}

export default ClassSlot;
