import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Sparkles, Moon, Sun, Waves } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [mode, setMode] = useState("dark");
  const [isHovering, setIsHovering] = useState(false);

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light");
    toast.success(`Switched to ${mode === "light" ? "Dark" : "Light"} mode`, {
      style: {
        borderRadius: "16px",
        background: mode === "light" ? "#1f2937" : "#f9fafb",
        color: mode === "light" ? "#f9fafb" : "#1f2937",
        border: `1px solid ${mode === "light" ? "rgba(147, 51, 234, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
      },
    });
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
        mode === "light" 
          ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" 
          : "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
      }`}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl ${
            mode === "light" 
              ? "bg-blue-300" 
              : "bg-blue-500"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl ${
            mode === "light" 
              ? "bg-purple-300" 
              : "bg-purple-500"
          }`}
        />
      </div>

      <Toaster position="top-center" />

      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4">
        {/* Theme Toggle Button - Floating */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`absolute top-8 right-8 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
            mode === "light"
              ? "bg-white/40 border-white/60 text-gray-700 shadow-lg hover:bg-white/60"
              : "bg-white/10 border-white/20 text-white shadow-2xl hover:bg-white/20"
          }`}
        >
          <AnimatePresence mode="wait">
            {mode === "light" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Main Card - Liquid Glass */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          className={`relative max-w-md w-full p-12 rounded-3xl backdrop-blur-2xl border transition-all duration-500 ${
            mode === "light"
              ? "bg-white/30 border-white/60 shadow-2xl"
              : "bg-white/10 border-white/20 shadow-2xl shadow-purple-500/20"
          }`}
        >
          {/* Liquid effect overlay */}
          <motion.div
            animate={{
              background: isHovering
                ? mode === "light"
                  ? "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)"
                  : "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2), transparent 70%)"
                : "transparent",
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
          />

          {/* Floating icons */}
          <div className="relative">
            <div className="flex justify-center items-center mb-8 space-x-4">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`p-4 rounded-2xl backdrop-blur-xl ${
                  mode === "light"
                    ? "bg-blue-500/20 border border-blue-500/30"
                    : "bg-blue-500/30 border border-blue-400/40"
                }`}
              >
                <Mic className="w-8 h-8 text-blue-400" />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Waves className={`w-12 h-12 ${mode === "light" ? "text-purple-500" : "text-purple-400"}`} />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className={`p-4 rounded-2xl backdrop-blur-xl ${
                  mode === "light"
                    ? "bg-purple-500/20 border border-purple-500/30"
                    : "bg-purple-500/30 border border-purple-400/40"
                }`}
              >
                <Volume2 className="w-8 h-8 text-purple-400" />
              </motion.div>
            </div>

            {/* Title with animated gradient */}
            <motion.h1
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
              style={{ backgroundSize: "200% 200%" }}
            >
              Speakify
            </motion.h1>

            <p className={`text-lg mb-8 font-medium ${
              mode === "light" ? "text-gray-700" : "text-gray-300"
            }`}>
              Speech ↔ Text Conversion
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Real-time", "AI-Powered", "High Accuracy"].map((feature, i) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-xl ${
                    mode === "light"
                      ? "bg-white/50 text-gray-700 border border-gray-300/50"
                      : "bg-white/10 text-gray-200 border border-white/20"
                  }`}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
                  mode === "light"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/50"
                    : "bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:shadow-2xl hover:shadow-purple-500/50"
                }`}
              >
                Start Speaking
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-2xl font-bold text-lg backdrop-blur-xl border-2 transition-all duration-300 ${
                  mode === "light"
                    ? "bg-white/40 border-purple-500/50 text-gray-700 hover:bg-white/60"
                    : "bg-white/10 border-purple-400/50 text-white hover:bg-white/20"
                }`}
              >
                Upload Audio
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`mt-12 flex items-center gap-2 text-sm ${
            mode === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>
          <span className="font-medium">Powered by modern web technologies</span>
        </motion.footer>
      </div>
    </div>
  );
}