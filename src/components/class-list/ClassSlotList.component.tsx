import { useEffect, useState } from "react";
import ClassSlot from "./ClassSlot.component";
import GetClassSlot from "../../services/api/class/classSlot/getClassSlot/api";
import {
  GetClassSlotResult,
  ClassSlotResult,
} from "../../services/api/class/classSlot/getClassSlot/dto";
import dayjs from "dayjs";
import ClassSlotSkeleton from "./ClassSlotSkeleton.component";

function ClassSlotList({ date }: Props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [classSlots, setClassSlots] = useState<ClassSlotResult[]>([]);
  const studentId = localStorage.getItem("accountId");
  const teacherId = null;

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const dateString = dayjs(date).format("YYYY-MM-DD");

        const response = await GetClassSlot({
          studentId,
          teacherId,
          date: dateString,
        });

        if (response.errorMessage) {
          setError(response.errorMessage);
        }

        setClassSlots(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [studentId, teacherId, date]);

  useEffect(() => {
    console.log(classSlots);
  }, [classSlots]);

  return (
    <div className="w-full">
      <div className="">
        {loading ? (
          <>
            <ClassSlotSkeleton />
          </>
        ) : (
          classSlots
            .filter((slot): slot is ClassSlotResult => slot != null)
            .map((slot) => <ClassSlot key={slot.id} slot={slot} />)
        )}

        {!loading && classSlots.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-8">
            <img
              src="/take_a_break.png"
              alt="Take a break Image"
            />
            <div className="text-2xl font-semibold m-2">No slot today</div>
            <p>Take a break and come back tomorrow!</p>
          </div>
        )}
      </div>
    </div>
  );
}

type Props = {
  date: Date;
};

export default ClassSlotList;
