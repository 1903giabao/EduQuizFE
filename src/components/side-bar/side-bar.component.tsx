import { useState } from "react";

function SideBar() {
  const [active, setActive] = useState<string>("home");

  const baseItem =
    "block rounded-lg px-4 py-4 text-md font-bold cursor-pointer transition-all duration-200 pl-6";

  const activeItem = "bg-white text-[#00adef]";
  const inactiveItem = "text-white hover:bg-white hover:text-blue4167cd";

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-e border-gray-100 rounded-e-3xl bg-gradient-to-r from-[#00adef] to-[#3871c1]">
      <div className="px-4 py-6">
        <div className="mt-4 flex justify-center items-center">
          <img src={`/EduQuizLogo.png`} alt="Take a break Image" className="w-24 h-24" />
        </div>

        <ul className="mt-12">
          {[
            { id: "home", label: "Home" },
            { id: "schedule", label: "Schedule" },
            { id: "classes", label: "My Classes" },
            { id: "quizzes", label: "My Quizzes" },
            { id: "profile", label: "Profile" },
          ].map((item) => (
            <li key={item.id} className="mt-4">
              <a
                onClick={() => setActive(item.id)}
                className={`${baseItem} ${
                  active === item.id ? activeItem : inactiveItem
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
