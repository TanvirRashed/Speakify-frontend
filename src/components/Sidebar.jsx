import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, User } from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/history", icon: History, label: "History" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/5 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ${
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      } overflow-hidden`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-purple-500/30"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;