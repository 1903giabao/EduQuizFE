import dayjs from "dayjs";
import { ScheduleOfClass } from "../../services/api/class/getClassById/dto";

function ScheduleTable({ scheduleList }: { scheduleList: ScheduleOfClass[] }) {
  function toTimeString(date: string) {
    var newDate = new Date(date);
    return dayjs(newDate).format("HH:mm");
  }
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Schedule</h2>

      <div className="h-[156px] overflow-y-auto pr-2">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-gray-500 border-b">
              <th className="pb-2">Day</th>
              <th className="pl-16 pb-2">Time</th>
              <th className="pb-2">Location</th>
            </tr>
          </thead>

          <tbody>
            {scheduleList.map((schedule, i) => (
              <tr key={i} className="border-b">
                <td className="py-2 font-semibold">{schedule.day}</td>
                <td className="pl-16">
                  {toTimeString(schedule.startTime)} - {toTimeString(schedule.endTime)}
                </td>
                <td>{schedule.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleTable;
