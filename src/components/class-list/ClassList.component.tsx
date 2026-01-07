import { useEffect, useState } from "react";
import GetClasses from "../../services/api/class/getClasses/api";
import ClassSlotSkeleton from "../class-slot-list/ClassSlotSkeleton.component";
import { ClassResult } from "../../services/api/class/getClasses/dto";
import Class from "./Class.component";
import { Role } from "../../types/role";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ClassList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const role = user.role;
  const accountId = user.id;

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        if (!role) {
          navigate("/login");
        }
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let payload: Record<string, any>;

        switch (role) {
          case Role.Teacher:
            payload = { teacherIds: accountId };
            break;

          case Role.Student:
            payload = { studentIds: accountId };
            break;

          default:
            navigate("/login");
        }

        const response = await GetClasses(payload);

        if (response.errorMessage) {
          setError(response.errorMessage);
          return;
        }

        setClasses(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAsync();
  }, [accountId]);

  return (
    <div className="w-full">
      <div className="">
        {loading ? (
          <>
            <ClassSlotSkeleton />
          </>
        ) : (
          classes
            .filter((cl): cl is ClassResult => cl != null)
            .map((cl) => <Class key={cl.id} classData={cl} />)
        )}

        {!loading && classes.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-8">
            <img src="/take_a_break.png" alt="Take a break Image" />
            <div className="text-2xl font-semibold m-2">No class today</div>
            <p>Take a break and come back tomorrow!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClassList;
