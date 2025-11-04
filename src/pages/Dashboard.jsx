import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Upload, Wand2, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("text-to-speech");
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextToSpeech = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Audio generated successfully!");
      setLoading(false);
    }, 2000);
  };

  const handleSpeechToText = async () => {
    if (!audioFile) {
      toast.error("Please upload an audio file");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult("This is a sample transcription of your audio file. Your actual transcription will appear here.");
      toast.success("Transcription completed!");
      setLoading(false);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      toast.success(`File "${file.name}" uploaded`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
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
          Dashboard
        </h1>
        <p className="text-slate-600">Convert speech to text or text to speech</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("text-to-speech")}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
            activeTab === "text-to-speech"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          <Volume2 className="inline w-5 h-5 mr-2" />
          Text to Speech
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab("speech-to-text")}
          className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
            activeTab === "speech-to-text"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          <Mic className="inline w-5 h-5 mr-2" />
          Speech to Text
        </motion.button>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
      >
        {activeTab === "text-to-speech" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-md font-medium text-slate-400 mb-2">
                Enter your text
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full h-48 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-slate-500 placeholder-slate-400 font-semibold focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Type or paste your text here..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTextToSpeech}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Speech
                </>
              )}
            </motion.button>

            {/* Audio Player Placeholder */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-8 text-center">
              <Volume2 className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <p className="text-gray-400">Your generated audio will appear here</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload audio file
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-300 mb-2">
                    {audioFile ? audioFile.name : "Click to upload audio file"}
                  </p>
                  <p className="text-sm text-gray-500">MP3, WAV, or OGG (Max 10MB)</p>
                </label>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSpeechToText}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Transcribing...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Transcribe Audio
                </>
              )}
            </motion.button>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/20 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Transcription Result</h3>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Copy className="w-5 h-5 text-gray-300" />
                  </button>
                </div>
                <p className="text-gray-300 leading-relaxed">{result}</p>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { label: "Conversions Today", value: "12", color: "from-blue-500 to-cyan-500" },
          { label: "Total Conversions", value: "248", color: "from-purple-500 to-pink-500" },
          { label: "Storage Used", value: "2.4 GB", color: "from-orange-500 to-red-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6"
          >
            <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;