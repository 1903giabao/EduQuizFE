import { useQuery } from "@tanstack/react-query";
import { Role } from "../../types/role";
import StudentProfileSection from "./StudentProfileSection.component";
import TeacherProfileSection from "./TeacherProfileSection.component";
import GetUserProfile from "../../services/api/user/getUserProfile/api";
import Loading from "../common/Loading.component";
import dayjs from "dayjs";

function UserProfile({ id }: Props) {
  const {
    data: profile,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["accounts", id],
    enabled: !!id,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await GetUserProfile({ id });

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      return response.data;
    },
  });

  function toDateString(date: string) {
    const newDate = new Date(date);
    return dayjs(newDate).format("DD/MM/YYYY");
  }

  if (isLoading) return <Loading />;
  if (!profile) return null;

  return (
    <main className="px-8 py-6 space-y-6">
<div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
  <img
    src="/avatar-placeholder.png"
    className="w-24 h-24 rounded-full border"
  />

  <div className="flex-1">
    <h1 className="text-2xl font-bold">{profile.fullName}</h1>
    <p className="text-gray-500">{profile.email}</p>
  </div>

  {/* Right-aligned badges */}
  <div className="ml-auto pr-24 flex flex-col items-end gap-2">
    <span className="px-4 py-1 rounded-full text-md font-bold bg-blue-100 text-blue-600">
      {profile.role.toUpperCase()}
    </span>

    {profile.isActive ? (
      <span className="px-4 py-1 rounded-full text-md font-bold bg-green-100 text-green-600">
        Active
      </span>
    ) : (
      <span className="px-4 py-1 rounded-full text-md font-bold bg-gray-100 text-black">
        Inactive
      </span>
    )}
  </div>
</div>


      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">General Information</h2>

        <div className="grid grid-cols-3 gap-6 text-lg">
          <div>
            <p className="text-gray-500">First Name</p>
            <p className="font-semibold">{profile.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500">Last Name</p>
            <p className="font-semibold">{profile.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Joined</p>
            <p className="font-semibold">{toDateString(profile.createdAt)}</p>
          </div>
          {profile.role === Role.Teacher && (
            <>
              <div>
                <p className="text-gray-500">Bio</p>
                <p className="font-semibold">{profile.bio}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p className="font-semibold">{profile.department}</p>
              </div>
            </>
          )}
          {profile.role === Role.Student && (
            <>
              <div>
                <p className="text-gray-500">Parent Phone Number</p>
                <p className="font-semibold">{profile.parentPhoneNumber}</p>
              </div>
              <div>
                <p className="text-gray-500">School</p>
                <p className="font-semibold">{profile.school}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {profile.role === Role.Teacher && (
        <TeacherProfileSection profile={profile} />
      )}

      {profile.role === Role.Student && (
        <StudentProfileSection profile={profile} />
      )}
    </main>
  );
}

export type Props = {
  id: string;
};

export default UserProfile;
