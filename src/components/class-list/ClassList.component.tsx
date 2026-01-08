import { useQuery } from "@tanstack/react-query";
import GetClasses from "../../services/api/class/getClasses/api";
import ClassSlotSkeleton from "../class-slot-list/ClassSlotSkeleton.component";
import { ClassResult } from "../../services/api/class/getClasses/dto";
import Class from "./Class.component";
import { Role } from "../../types/role";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ClassStatus } from "../../types/class";
import { useEffect, useState } from "react";

const PAGE_SIZE = 3;

function ClassList({ search, status }: Props) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;
  const accountId = user?.id;

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["classes", role, accountId, search, status, page],
    enabled: !!role && !!accountId,
    queryFn: async () => {
      let payload: Record<string, any> = { page, pageSize: PAGE_SIZE };

      switch (role) {
        case Role.Teacher:
          payload.teacherIds = accountId;
          break;
        case Role.Student:
          payload.studentIds = accountId;
          break;
        default:
          navigate("/login");
          return null;
      }

      if (search) {
        payload.keyword = search;
      }

      if (status) {
        payload.status = status;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await GetClasses(payload);

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      return response;
    },
  });

  if (isLoading) return <ClassSlotSkeleton />;

  const classes = (data.data ?? []).filter(
    (cl): cl is ClassResult => cl != null
  );
  const meta = data.meta;
  const totalPages = meta?.totalPages ?? 1;

  function renderByRole(role: string) {
    switch (role) {
      case Role.Student: {
        return (
          <>
            <img src="/take_a_break.png" alt="Take a break Image" />
            <div className="text-2xl font-semibold m-2">
              You haven't joined any classes
            </div>
            <p>Register with your teacher to attend a class</p>
          </>
        );
      }
      case Role.Teacher: {
        return (
          <>
            <img src="/take_a_break.png" alt="Take a break Image" />
            <div className="text-2xl font-semibold m-2">
              You haven't created any classes
            </div>
            <p>Create a class to continue</p>
          </>
        );
      }
    }
  }

  return (
    <div className="w-full">
      {classes.map((cl) => (
        <Class key={cl.id} classData={cl} />
      ))}

      {classes.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-8">
          {renderByRole(role)}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
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
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

type Props = {
  search: string;
  status: ClassStatus;
};

export default ClassList;
