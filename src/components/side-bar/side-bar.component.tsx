import { useState } from "react";

function SideBar() {
  const [active, setActive] = useState<string>("home");

  const baseItem =
    "block rounded-lg px-4 py-4 text-sm font-medium cursor-pointer transition-all duration-200 pl-6";

  const activeItem = "bg-blue4167cd text-white";
  const inactiveItem = "text-gray-500 hover:bg-blue4167cd hover:text-white";

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-e border-gray-100 bg-white">
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

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span className="text-gray-500">eric@frusciante.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
