import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="
          fixed top-4 left-4 z-50
          p-2 rounded-md
          bg-white shadow-md
          sm:block md:hidden
        "
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/30 z-40 transition-opacity
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
          sm:block md:hidden
        `}
      ></div>

      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen bg-white z-50
          w-56 md:w-20
          shadow-lg md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        <nav className="h-full border-r md:border-r shadow-sm flex flex-col p-4 gap-5">
          <ul className="flex-1 flex flex-col gap-3">{children}</ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
