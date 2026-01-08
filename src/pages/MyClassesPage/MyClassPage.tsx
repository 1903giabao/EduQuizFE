import { useState } from "react";
import AddButton from "../../components/button/AddButton.component";
import ClassList from "../../components/class-list/ClassList.component";
import HeaderBar from "../../components/header/HeaderBar.component";
import SideBar from "../../components/side-bar/side-bar.component";
import AddClassModal from "../../components/modals/AddClassModal.component";
import { ClassStatus } from "../../types/class";

function MyClassPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ClassStatus>(ClassStatus.Published);

  return (
    <>
      <div className="flex h-screen">
        <div className="absolute -z-10 left-60 w-[calc(100%-15rem)]">
          <HeaderBar title="My classes" />
        </div>

        <div className="w-64">
          <SideBar />
        </div>

        <div className="flex-1 mt-12 p-6">
          <div className="flex items-center mt-8 mb-6">
            <div className="flex-1 text-center text-4xl font-bold text-[#00adef]">
              My classes
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 ml-20">
            <input
              placeholder="Enter keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border px-4 py-2"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ClassStatus)}
              className="rounded-lg border px-4 py-2"
            >
              <option value={ClassStatus.Published}>Published</option>
              <option value={ClassStatus.Unpublished}>Unpublished</option>
              <option value={ClassStatus.Draft}>Draft</option>
            </select>
            <div className="ml-auto mr-20">
              <AddButton onClick={() => setOpen(true)} />
            </div>
          </div>

          <ClassList search={search} status={status} />
        </div>
      </div>

      {open && <AddClassModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default MyClassPage;
