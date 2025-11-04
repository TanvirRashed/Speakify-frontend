import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Bell, Palette, Save, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    notifications: true,
    darkMode: true,
    language: "en",
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-300">Manage your account and preferences</p>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-400">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">
                Active
              </span>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Display Name
              </label>
              <input
                type="text"
                value={settings.displayName}
                onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Your name"
              />
            </div>
          </div>
        </motion.div>

        {/* Preferences Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">Preferences</h3>

          <div className="space-y-6">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Notifications</p>
                  <p className="text-sm text-gray-400">Receive conversion updates</p>
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  settings.notifications ? "bg-purple-500" : "bg-white/20"
                }`}
              >
                <motion.div
                  animate={{ x: settings.notifications ? 28 : 4 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full"
                />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-400">Use dark theme</p>
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  settings.darkMode ? "bg-purple-500" : "bg-white/20"
                }`}
              >
                <motion.div
                  animate={{ x: settings.darkMode ? 28 : 4 }}
                  className="absolute top-1 w-5 h-5 bg-white rounded-full"
                />
              </button>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Shield className="inline w-4 h-4 mr-2" />
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="px-8 py-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Total Conversions", value: "248" },
            { label: "Storage Used", value: "2.4 GB" },
            { label: "Member Since", value: "Jan 2024" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;