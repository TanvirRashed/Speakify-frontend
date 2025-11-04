import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, LogOut, User, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = ({ isPublic, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            {!isPublic && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Speakify
              </span>
            </Link>
          </div>

          {/* Right: Auth Section */}
          <div className="flex items-center gap-4">
            {isPublic ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-500 transition-colors"
                >
                  <User className="w-6 h-6 text-red-500" />
                  <span className="text-black">{user?.email}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-50 backdrop-blur-xl border border-slate-200 rounded-md shadow-xl">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-red-500 hover:bg-white/10 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-red-600 bg-red-400 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;