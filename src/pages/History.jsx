import { motion } from "framer-motion";
import { Clock, Mic, Volume2, Download, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const History = () => {
  // Sample data - replace with actual API data
  const conversions = [
    {
      id: 1,
      type: "text-to-speech",
      content: "Hello, this is a sample text conversion...",
      date: "2024-01-15",
      time: "10:30 AM",
    },
    {
      id: 2,
      type: "speech-to-text",
      content: "This is a transcribed audio message from...",
      date: "2024-01-14",
      time: "3:45 PM",
    },
    {
      id: 3,
      type: "text-to-speech",
      content: "Another text to speech conversion example...",
      date: "2024-01-14",
      time: "11:20 AM",
    },
    {
      id: 4,
      type: "speech-to-text",
      content: "Meeting notes transcription from the...",
      date: "2024-01-13",
      time: "2:15 PM",
    },
  ];

  const handleDownload = (id) => {
    toast.success("Download started!");
  };

  const handleDelete = (id) => {
    toast.success("Conversion deleted!");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
          Conversion History
        </h1>
        <p className="text-gray-300">View and manage your past conversions</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-gray-400">Total Conversions</span>
          </div>
          <p className="text-3xl font-bold text-white">248</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Volume2 className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-gray-400">Text to Speech</span>
          </div>
          <p className="text-3xl font-bold text-white">156</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Mic className="w-5 h-5 text-pink-400" />
            </div>
            <span className="text-gray-400">Speech to Text</span>
          </div>
          <p className="text-3xl font-bold text-white">92</p>
        </motion.div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {conversions.map((conversion, index) => (
          <motion.div
            key={conversion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: Icon & Content */}
              <div className="flex gap-4 flex-1">
                <div
                  className={`p-3 rounded-xl ${
                    conversion.type === "text-to-speech"
                      ? "bg-purple-500/20"
                      : "bg-blue-500/20"
                  }`}
                >
                  {conversion.type === "text-to-speech" ? (
                    <Volume2 className="w-6 h-6 text-purple-400" />
                  ) : (
                    <Mic className="w-6 h-6 text-blue-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white">
                      {conversion.type === "text-to-speech"
                        ? "Text to Speech"
                        : "Speech to Text"}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {conversion.date} at {conversion.time}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {conversion.content}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDownload(conversion.id)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5 text-gray-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(conversion.id)}
                  className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no conversions) */}
      {conversions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-12 text-center"
        >
          <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No conversions yet</h3>
          <p className="text-gray-400">
            Start converting text to speech or speech to text to see your history here.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default History;