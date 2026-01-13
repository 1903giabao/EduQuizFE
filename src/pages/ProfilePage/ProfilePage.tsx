import { useParams } from "react-router-dom";
import HeaderBar from "../../components/header/HeaderBar.component";
import UserProfile from "../../components/profile/Profile.component";
import SideBar from "../../components/side-bar/side-bar.component";

function ProfilePage() {
  const { id } = useParams();
  if (!id) return;

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <aside className="fixed left-0 top-0 h-screen w-64 z-20">
        <SideBar />
      </aside>

      <div className="flex min-h-screen flex-col">
        <div className="ml-60">
          <HeaderBar title="Profile" />
        </div>
        <div className="ml-64">
          <UserProfile id={id} />
        </div>
      </div>
    </div>
  );
}

export type Props = {
  id?: string;
};

export default ProfilePage;
