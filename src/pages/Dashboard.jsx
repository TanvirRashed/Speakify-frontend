import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2, Upload, Wand2, Download, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { ttsConvert, asrConvert, getVoices, getUserStats } from "../services/speakify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("text-to-speech");
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  // TTS options
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [speed, setSpeed] = useState(1.0);
  
  // Stats
  const [stats, setStats] = useState({
    todayCount: 0,
    totalConversions: 0,
    storageUsed: 0
  });

  // Fetch voices on mount
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const voiceList = await getVoices();
        setVoices(voiceList);
      } catch (error) {
        console.error("Failed to fetch voices:", error);
      }
    };
    fetchVoices();
  }, []);

  // Fetch user stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await getUserStats();
        if (userStats) {
          setStats({
            todayCount: userStats.todayCount || 0,
            totalConversions: userStats.totalConversions || 0,
            storageUsed: userStats.storageUsedMB || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

const handleTextToSpeech = async () => {
  if (!textInput.trim()) { toast.error('Please enter text'); return; }
  setLoading(true);
  try {
    const res = await ttsConvert({ text: textInput, voice: selectedVoice, speed });
    setAudioUrl(res.audioUrl || '');
    setResult(''); // clear transcript/result for TTS
    // Optional: auto-play
    if (res.audioUrl) new Audio(res.audioUrl).play().catch(() => {});
    toast.success('Audio generated');
  } catch (e) {
    toast.error(e?.response?.data?.message || 'TTS failed');
  } finally {
    setLoading(false);
  }
};

const handleSpeechToText = async () => {
  if (!audioFile) { toast.error('Upload an audio file'); return; }
  setLoading(true);
  try {
    const res = await asrConvert(audioFile);
    setResult(res.transcript || '');
    setAudioUrl(res.audioUrl || ''); // if you want to preview the uploaded audio
    toast.success('Transcribed');
  } catch (e) {
    toast.error(e?.response?.data?.message || 'ASR failed');
  } finally {
    setLoading(false);
  }
};

  // const handleSpeechToText = async () => {
  //   if (!audioFile) {
  //     toast.error("Please upload an audio file");
  //     return;
  //   }

  //   // Validate file size (25MB)
  //   if (audioFile.size > 25 * 1024 * 1024) {
  //     toast.error("File size must be less than 25MB");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setResult(""); // Clear previous result
      
  //     const data = await asrConvert(audioFile);
      
  //     if (data?.transcription) {
  //       setResult(data.transcription);
  //       toast.success("Transcription completed!");
        
  //       // Refresh stats
  //       const newStats = await getUserStats();
  //       if (newStats) {
  //         setStats({
  //           todayCount: newStats.todayCount || 0,
  //           totalConversions: newStats.totalConversions || 0,
  //           storageUsed: newStats.storageUsedMB || 0
  //         });
  //       }
  //     } else {
  //       toast.error("Failed to transcribe audio");
  //     }
  //   } catch (error) {
  //     console.error("ASR Error:", error);
  //     const msg = error?.response?.data?.message || error?.message || "ASR conversion failed";
  //     toast.error(msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      toast.success(`File "${file.name}" uploaded`);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard!");
  };

  const downloadAudio = () => {
    if (audioUrl) {
      window.open(audioUrl, '_blank');
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setResult("");
    setAudioUrl("");
    setAudioFile(null);
  };

 return (
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text tracking-tight mb-2">
        Dashboard
      </h1>
      <p className="text-slate-300/90">Convert speech to text or text to speech</p>
    </motion.div>

    {/* Tabs */}
    <div className="flex gap-4 mb-8">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTabSwitch("text-to-speech")}
        className={`flex-1 py-4 rounded-2xl font-semibold transition-all border ${
          activeTab === "text-to-speech"
            ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-500/20 border-transparent ring-1 ring-inset ring-white/10"
            : "bg-white/[0.06] text-slate-200/90 hover:bg-white/[0.10] border-white/15"
        }`}
      >
        <Volume2 className="inline w-5 h-5 mr-2 opacity-90" />
        Text to Speech
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTabSwitch("speech-to-text")}
        className={`flex-1 py-4 rounded-2xl font-semibold transition-all border ${
          activeTab === "speech-to-text"
            ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-500/20 border-transparent ring-1 ring-inset ring-white/10"
            : "bg-white/[0.06] text-slate-200/90 hover:bg-white/[0.10] border-white/15"
        }`}
      >
        <Mic className="inline w-5 h-5 mr-2 opacity-90" />
        Speech to Text
      </motion.button>
    </div>

    {/* Content */}
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl p-8 shadow-xl shadow-black/10"
    >
      {activeTab === "text-to-speech" ? (
        <div className="space-y-6">
          {/* Voice and Speed Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Voice
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-slate-100 focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-400/50 transition-colors"
              >
                {voices.length > 0 ? (
                  voices.map((voice) => (
                    <option key={voice.id} value={voice.id} className="bg-slate-900">
                      {voice.name}
                    </option>
                  ))
                ) : (
                  <option value="alloy" className="bg-slate-900">Alloy</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Speed: {speed}x
              </label>
              <input
                type="range"
                min="0.25"
                max="4"
                step="0.25"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-violet-500 bg-white/20 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
              />
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Enter your text
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-48 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-violet-500/30 focus:border-violet-400/50 transition-colors resize-none"
              placeholder="Type or paste your text here..."
              maxLength={4000}
            />
            <p className="text-sm text-slate-400 mt-1">
              {textInput.length}/4000 characters
            </p>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTextToSpeech}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold transition-all bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/10"
          >
            {loading ? (
              <span className="inline-flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="inline-flex items-center gap-3">
                <Wand2 className="w-5 h-5" />
                Generate Speech
              </span>
            )}
          </motion.button>

          {/* Audio Player */}
          <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-6">
            {audioUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Generated Audio</h3>
                  <button
                    onClick={downloadAudio}
                    className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-colors"
                    title="Download audio"
                  >
                    <Download className="w-5 h-5 text-slate-200" />
                  </button>
                </div>
                <audio key={audioUrl} controls src={audioUrl} className="w-full" autoPlay>
                  Your browser does not support the audio element.
                </audio>
              </motion.div>
            ) : (
              <div className="text-center">
                <Volume2 className="w-14 h-14 mx-auto text-violet-400 mb-3 opacity-90" />
                <p className="text-slate-300/90">Your generated audio will appear here</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Upload audio file
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-fuchsia-500/60 transition-colors cursor-pointer bg-white/[0.04]">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload"
              />
              <label htmlFor="audio-upload" className="cursor-pointer block">
                <Upload className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-200 mb-2">
                  {audioFile ? audioFile.name : "Click to upload audio file"}
                </p>
                <p className="text-sm text-slate-400">
                  MP3, WAV, OGG, M4A, FLAC (Max 25MB)
                </p>
              </label>
            </div>
          </div>

          {/* Transcribe Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpeechToText}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold transition-all bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/30 disabled:opacity-50 disabled:cursor-not-allowed ring-1 ring-white/10"
          >
            {loading ? (
              <span className="inline-flex items-center gap-3">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Transcribing...
              </span>
            ) : (
              <span className="inline-flex items-center gap-3">
                <Wand2 className="w-5 h-5" />
                Transcribe Audio
              </span>
            )}
          </motion.button>

          {/* Transcription Result */}
          {result !== "" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/[0.06] border border-white/15 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Transcription Result</h3>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5 text-slate-200" />
                </button>
              </div>
              <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{result}</p>
            </motion.div>
          ) : (
            <div className="bg-white/[0.06] border border-white/15 rounded-2xl p-6 text-slate-400">
              No transcript yet. Upload an audio file and click “Transcribe Audio”.
            </div>
          )}
        </div>
      )}
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {[
        {
          label: "Conversions Today",
          value: stats.todayCount.toString(),
          gradient: "from-violet-500 via-fuchsia-500 to-cyan-500",
        },
        {
          label: "Total Conversions",
          value: stats.totalConversions.toString(),
          gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
        },
        {
          label: "Storage Used",
          value: `${stats.storageUsed} MB`,
          gradient: "from-amber-500 via-orange-500 to-rose-500",
        },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl p-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent"
        >
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-2xl p-6 h-full">
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`}>
              {stat.value}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
};

export default Dashboard;