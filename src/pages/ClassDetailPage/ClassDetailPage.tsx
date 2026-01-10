import { useParams } from "react-router-dom";
import HeaderBar from "../../components/header/HeaderBar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import ClassDetail from "../../components/class-detail/ClassDetail.component";

function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <aside className="fixed left-0 top-0 h-screen w-64 z-20">
        <SideBar />
      </aside>
      <div className="ml-64 flex min-h-screen flex-col">
        <HeaderBar title="Class detail" />
        <main className="px-8 py-6">
          <ClassDetail id={id} />
        </main>
      </div>
    </div>
  );
}

export default ClassDetailPage;
