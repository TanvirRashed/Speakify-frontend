// src/services/speakify.js
import api from './api';

/**
 * Get available TTS voices
 */
export const getVoices = async () => {
  try {
    const response = await api.get('/tts/voices');
    return response.data.voices;
  } catch (error) {
    console.error('Get voices error:', error);
    throw error;
  }
};

/**
 * Convert text to speech
 */
export const ttsConvert = async ({ text, voice = 'alloy', speed = 1.0 }) => {
  try {
    const response = await api.post('/tts/convert', {
      text,
      voice,
      speed
    });
    return response.data;
  } catch (error) {
    console.error('TTS convert error:', error);
    throw error;
  }
};

/**
 * Convert speech to text
 */
export const asrConvert = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await api.post('/asr/convert', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('ASR convert error:', error);
    throw error;
  }
};

/**
 * Get user statistics
 */
export const getUserStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data.stats;
  } catch (error) {
    console.error('Get stats error:', error);
    throw error;
  }
};

/**
 * Get conversion history
 */
export const getHistory = async (limit = 50, offset = 0) => {
  try {
    const response = await api.get('/stats/history', {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error('Get history error:', error);
    throw error;
  }
};

/**
 * Delete conversion from history
 */
export const deleteHistoryItem = async (id) => {
  try {
    const response = await api.delete(`/stats/history/${id}`);
    return response.data;
  } catch (error) {
    console.error('Delete history error:', error);
    throw error;
  }
};

export default {
  getVoices,
  ttsConvert,
  asrConvert,
  getUserStats,
  getHistory,
  deleteHistoryItem
};