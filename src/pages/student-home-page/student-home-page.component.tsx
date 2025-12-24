import { useNavigate } from "react-router-dom";
import SideBar from "../../components/side-bar/side-bar.component";

function StudentHomePage() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold">Student Dashboard</h2>
        <p className="mt-2 text-gray-600">Take quizzes & view grades</p>

        <button
          onClick={logout}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentHomePage;
