import { useParams } from "react-router-dom";
import HeaderBar from "../../components/header/HeaderBar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import ClassDetail from "../../components/class-detail/ClassDetail.component";
import { useQuery } from "@tanstack/react-query";
import GetClassById from "../../services/api/class/getClassById/api";

function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: classDetail,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["classes", id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("Class id is missing");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await GetClassById({ classId: id });

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <aside className="fixed left-0 top-0 h-screen w-64 z-20">
        <SideBar />
      </aside>
      <div className="ml-64 flex min-h-screen flex-col">
        <HeaderBar title="Class detail" />
        <main className="px-8 py-6">
          <ClassDetail classDetail={classDetail} />
        </main>
      </div>
    </div>
  );
}

export default ClassDetailPage;
