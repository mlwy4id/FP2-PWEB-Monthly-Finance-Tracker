import { NavLink } from "react-router-dom";

const SidebarOptions = ({ icon, text, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
        group relative flex justify-center items-center rounded-sm py-1 cursor-pointer transition-colors
        ${
          isActive
            ? "bg-indigo-200 text-blue-800"
            : "hover:bg-indigo-100 text-gray-600"
        }
        `}
      >
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <span
          className="
        absolute group-hover:opacity-100 group-hover:block group-hover:translate-x-0 group-hover:pointer-events-auto
        opacity-0 -translate-x-25 transition-all
        bg-indigo-200 p-1.5 text-center rounded-sm left-[55px] text-blue-800
        "
        >
          {text}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarOptions;
