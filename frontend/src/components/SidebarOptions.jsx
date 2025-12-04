import { NavLink } from "react-router-dom";

const SidebarOptions = ({ icon, text, to }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          group relative flex items-center 
          md:justify-center justify-start
          rounded-sm py-1 cursor-pointer transition-colors
          px-3 md:px-0
          ${
            isActive
              ? "bg-indigo-200 text-blue-800"
              : "hover:bg-indigo-100 text-gray-600"
          }
        `}
      >
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          {icon}
        </div>

        <span className="ml-3 md:hidden font-medium text-sm">
          {text}
        </span>

        <span
          className="
            hidden md:block
            absolute left-[55px]
            opacity-0 -translate-x-3 pointer-events-none
            group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto
            transition-all duration-200
            bg-indigo-200 px-2 py-1 text-blue-800 text-xs rounded-md shadow
            whitespace-nowrap
          "
        >
          {text}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarOptions;
