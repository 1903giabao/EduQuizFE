import { useLocation, useNavigate } from "react-router-dom";
import {
  ClassIcon,
  HelpIcon,
  HomeIcon,
  ProfileIcon,
  QuizIcon,
  ScheduleIcon,
  SignOutIcon,
} from "./side-bar-icons.component";
import { useAuth } from "../../context/AuthContext";

export const SideBarSection = [
  {
    id: "schedule",
    label: "Schedule",
    path: "/schedule",
    icon: <ScheduleIcon />,
  },
  { id: "classes", label: "Classes", path: "/classes", icon: <ClassIcon /> },
  { id: "quizzes", label: "Quizzes", path: "/quizzes", icon: <QuizIcon /> },
  { id: "profile", label: "Profile", path: "/profile", icon: <ProfileIcon /> },
];

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const baseItem =
    "flex flex-row gap-4 block rounded-e-3xl pl-10 pr-4 py-4 text-lg font-bold cursor-pointer transition-all duration-200 pl-6";

  const activeItem = "bg-white text-[#00adef]";
  const inactiveItem = "text-white hover:bg-white hover:text-blue4167cd";

  return (
    <div className="flex min-h-screen w-64 flex-col justify-between border-e border-gray-100 rounded-e-3xl bg-gradient-to-r from-[#00adef] to-[#3871c1]">
      <div className="py-6">
        <div className="mt-4 flex justify-center items-center">
          <img
            src={`/EduQuizLogo.png`}
            alt="Take a break Image"
            className="w-24 h-24"
          />
        </div>

        <ul className="mt-20">
          {SideBarSection.map((item) => {
            const isActive = location.pathname.includes(item.path);

            return (
              <li key={item.id} className="mt-4">
                <div
                  onClick={() => navigate(item.path)}
                  className={`${baseItem} ${
                    isActive ? activeItem : inactiveItem
                  }`}
                >
                  <span className="my-auto">{item.icon}</span>
                  <a>{item.label}</a>
                </div>
              </li>
            );
          })}
        </ul>
        <ul className="mt-40">
          <li className="mt-4">
            <div
              onClick={() => navigate("/")}
              className={`${baseItem} ${
                location.pathname === "/help" ? activeItem : inactiveItem
              }`}
            >
              <span className="my-auto">
                <HelpIcon />
              </span>
              <a className="">Help</a>
            </div>
          </li>
          <li className="mt-4">
            <div
              onClick={() => handleLogout()}
              className={`${baseItem} ${inactiveItem}`}
            >
              <span className="my-auto">
                <SignOutIcon />
              </span>
              <a className="">Sign out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
