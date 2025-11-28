const Sidebar = ({ children }) => {
  return (
    <aside className="sticky w-20 top-0 h-screen">
      <nav className="h-full border-r shadow-sm flex flex-col p-4 gap-5">
        <ul className="flex-1 flex flex-col gap-3">{children}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
