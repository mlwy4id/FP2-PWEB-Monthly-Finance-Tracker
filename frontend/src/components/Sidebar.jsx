import { useState } from "react";
import { Menu, X, User, LogOut, Settings, Trash2 } from "lucide-react";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleUsernameChange = () => {
    alert("Mengganti Username...");
    setUserMenuOpen(false);
  };

  const handleDeleteAccount = () => {
    if (confirm("Apakah Anda yakin ingin menghapus akun?")) {
      alert("Menghapus Akun...");
    }
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    alert("Logout...");
    setUserMenuOpen(false);
  };

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
        onClick={() => {
          setOpen(false);
          setUserMenuOpen(false);
        }}
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

          <div className="relative border-t pt-4">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="
                w-full flex items-center p-2 rounded-lg 
                hover:bg-gray-100 transition-colors
              "
            >
              <User size={22} className="text-gray-600" />
              <span className="ml-3 font-medium hidden md:group-hover:block md:w-full md:hidden">
                User
              </span>
            </button>

            {userMenuOpen && (
              <div
                className="
                  absolute bottom-full mb-2 left-0 w-full 
                  bg-white rounded-lg shadow-xl border z-50
                  md:w-48 md:left-20 md:bottom-auto md:top-auto
                  md:transform md:translate-x-0 md:translate-y-0
                "
              >
                <div className="p-2 space-y-1">
                  <button
                    onClick={handleUsernameChange}
                    className="
                      w-full flex items-center p-2 rounded-md 
                      text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600
                    "
                  >
                    <Settings size={18} className="mr-3" />
                    Ganti Username
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="
                      w-full flex items-center p-2 rounded-md 
                      text-sm text-gray-700 hover:bg-red-50 hover:text-red-600
                    "
                  >
                    <Trash2 size={18} className="mr-3" />
                    Hapus Akun
                  </button>
                  
                  <div className="border-t my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center p-2 rounded-md 
                      text-sm text-gray-700 hover:bg-red-50 hover:text-red-600
                    "
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;