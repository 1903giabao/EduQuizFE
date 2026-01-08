import { useEffect, useState } from "react";
import ClassSlot from "./ClassSlot.component";
import { ClassSlotResult } from "../../services/api/class/classSlot/getClassSlotByStudentId/dto";
import dayjs from "dayjs";
import ClassSlotSkeleton from "./ClassSlotSkeleton.component";
import { useAuth } from "../../context/AuthContext";
import GetClassSlotByStudentId from "../../services/api/class/classSlot/getClassSlotByStudentId/api";
import { useQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

function ClassSlotList({ date }: Props) {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const studentId = user.id;
  const teacherId = null;

  useEffect(() => {
    setPage(1);
  }, [date]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["class-slots", studentId, teacherId, date, page],
    enabled: !!studentId && !!date,
    queryFn: async () => {
      const dateString = dayjs(date).format("YYYY-MM-DD");

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await GetClassSlotByStudentId({
        studentId,
        teacherId,
        date: dateString,
        page,
        pageSize: PAGE_SIZE,
      });

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      return response;
    },
  });

  const classSlots = (data?.data ?? []).filter(
    (slot): slot is ClassSlotResult => slot != null
  );

  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  if (isLoading) {
    return <ClassSlotSkeleton />;
  }

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
            <img src="/take_a_break.png" alt="Take a break Image" />
            <div className="text-2xl font-semibold m-2">No class today</div>
            <p>Take a break and come back tomorrow!</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {meta.page} / {meta.totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border px-4 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {isFetching && (
          <div className="fixed bottom-4 right-4 text-sm text-gray-500">
            Updating...
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
