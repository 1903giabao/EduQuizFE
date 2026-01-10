import { useAuth } from "../../context/AuthContext";
import { Role } from "../../types/role";

export const SideBarSection = [
  { id: "home", label: "Home" },
  { id: "schedule", label: "Schedule" },
  { id: "classes", label: "My Classes" },
  { id: "quizzes", label: "My Quizzes" },
  { id: "profile", label: "Profile" },
];

function HeaderBar({ title }: Props) {
  const { user } = useAuth();
  return (
    <header className="h-16 pl-16 bg-white flex">
      <div className="flex flex-row gap-4 pr-20 items-center">
        <div className="flex justify-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="text-xl font-semibold">{title}</div>
      </div>
      <div className="my-auto ml-auto mr-4 flex items-center justify-end rounded-lg bg-blue-400 p-2 text-center text-white shadow-lg dark:text-gray-200">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div className="my-auto">
        <div className="text-lg font-semibold">{user.fullName}</div>
        <div>{user.email}</div>
      </div>
      <div className="my-auto ml-4 mr-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className="w-10 h-10 text-gray-400"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="9" r="3" fill="currentColor" />
          <path
            d="M6 18c1.5-3 10.5-3 12 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          />
        </svg>
      </div>
    </header>
  );
}

type Props = {
  title: string;
};

export default HeaderBar;
