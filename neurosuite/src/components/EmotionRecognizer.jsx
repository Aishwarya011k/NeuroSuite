import React, { useState } from 'react';
import { FaBrain, FaFileUpload, FaInfoCircle } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import LoadingSpinner from './LoadSpinner';
import { emotionApi } from '../services/emotionApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EMOTION_ICONS = {
  'Happy': '😊',
  'Sad': '😢',
  'Angry': '😠',
  'Neutral': '😐',
  'Excited': '🤩',
  'Relaxed': '😌',
  'Stressed': '😰',
  'Focused': '🧐'
};

/**
 * @typedef {Object} EmotionResponse
 * @property {string} emotion - The detected emotion
 * @property {number} confidence - Confidence score (0-100)
 * @property {string} description - Detailed description
 * @property {Object} [metadata] - Optional file metadata
 * @property {string[]} [metadata.channels] - List of channels
 * @property {number} [metadata.samplingRate] - Sampling rate
 * @property {number} [metadata.duration] - Duration in seconds
 */

const EmotionRecognizer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Add authentication check
  React.useEffect(() => {
    if (!user) {
      navigate('/login', { 
        state: { from: '/emotion-recognizer' },
        replace: true 
      });
    }
  }, [user, navigate]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  /** @type {[EmotionResponse | null, React.Dispatch<React.SetStateAction<EmotionResponse | null>>]} */
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile?.name.endsWith('.edf')) {
      setError('Please upload a valid EDF file');
      return;
    }
    setFile(uploadedFile);
    setError('');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload({ target: { files: [droppedFile] } });
    }
  };

  const handleDetection = async () => {
    if (!user) {
      setError('Please login to use this feature');
      navigate('/login');
      return;
    }

    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setLoading(true);
    try {
      // Get file metadata first
      const metadata = await emotionApi.getFileMetadata(file);
      if (!metadata) {
        throw new Error('Failed to read file metadata');
      }

      // Validate metadata
      if (!metadata.channels || !metadata.samplingRate) {
        throw new Error('Invalid EEG file format');
      }

      // Classify emotion
      const result = await emotionApi.classifyEmotion(file);
      if (!result.emotion) {
        throw new Error('Failed to classify emotion');
      }
      
      setResults({
        emotion: result.emotion,
        confidence: result.confidence,
        description: result.description,
        metadata: {
          channels: metadata.channels,
          samplingRate: metadata.samplingRate,
          duration: metadata.duration
        }
      });
    } catch (err) {
      setError(err.message);
      if (err.message.includes('authentication')) {
        navigate('/login');
      }
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">
            <Typewriter words={["Emotion Recognition"]} loop cursor cursorStyle="|" />
          </h1>
          <p className="text-xl text-gray-400">
            Analyze EEG signals to detect emotional states with advanced neural networks
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <input
              type="file"
              id="edf-file"
              className="hidden"
              accept=".edf"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="edf-file"
              className="cursor-pointer space-y-4 block"
            >
              <FaBrain className="w-12 h-12 text-blue-400 mx-auto" />
              <div className="text-lg text-gray-300">
                Drag & drop your EEG file here or click to upload
              </div>
              <div className="text-sm text-gray-500">
                Accepted format: .edf
              </div>
            </label>
            {file && (
              <div className="mt-4 text-green-400">
                Selected file: {file.name}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <FaInfoCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleDetection}
            disabled={loading || !file}
            className={`w-full mt-6 p-3 rounded-lg flex items-center justify-center space-x-2
              ${loading || !file 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Analyzing Emotional State...</span>
              </>
            ) : (
              <>
                <FaFileUpload className="w-5 h-5" />
                <span>Analyze Emotion</span>
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-100 mb-6">
              Emotion Analysis Results
            </h2>
            
            {/* File Information */}
            {results.metadata && (
              <div className="mb-6 grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-800/40 p-4 rounded-lg">
                <div className="text-sm">
                  <span className="text-gray-400">Channels:</span>
                  <p className="text-gray-200">{results.metadata.channels.join(', ')}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Sampling Rate:</span>
                  <p className="text-gray-200">{results.metadata.samplingRate} Hz</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <p className="text-gray-200">{results.metadata.duration}s</p>
                </div>
              </div>
            )}

            {/* Emotion Results */}
            <div className="p-8 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <div className="text-center space-y-6">
                <div className="text-7xl animate-bounce">
                  {EMOTION_ICONS[results.emotion]}
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-blue-400">
                    {results.emotion}
                  </h3>
                  <div className="text-lg text-blue-200">
                    Confidence: {results.confidence}%
                  </div>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {results.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionRecognizer;