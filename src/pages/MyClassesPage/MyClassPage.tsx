import ClassList from "../../components/class-list/ClassList.component";
import HeaderBar from "../../components/header/HeaderBar.component";
import SideBar from "../../components/side-bar/side-bar.component";

function MyClassPage() {
  return (
    <div className="flex h-screen">
      <div className="absolute -z-10 left-60 w-[calc(100%-15rem)]">
        <HeaderBar title="My classes" />
      </div>
      <div className="w-64">
        <SideBar />
      </div>
      <div className="flex-1 mt-12 p-6">
        <div className="text-center mt-8 mb-8 text-4xl font-bold text-[#00adef]">
          My classes
        </div>
        <ClassList />
      </div>
    </div>
  );
}

export default MyClassPage;
