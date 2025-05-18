import React, { useState, useEffect } from 'react';
import { FaBed, FaChartArea, FaFileDownload, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from './LoadSpinner';
import { eegApi } from '../services/eegApi';
import { Typewriter } from 'react-simple-typewriter';
import { useAuth } from '../context/AuthContext'; // Fixed import path
import { useNavigate } from 'react-router-dom';

const STAGE_ICONS = {
  'Wake': '👀',
  'N1': '😌',
  'N2': '💫',
  'N3/N4': '😴',
  'REM': '🌙'
};

const SleepStageDetector = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { 
        state: { from: '/sleep-detector' },
        replace: true 
      });
    }
  }, [user, navigate]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [sleepStages, setSleepStages] = useState([]);
  const [fileInfo, setFileInfo] = useState(null);

  useEffect(() => {
    // Fetch sleep stages information on component mount
    const fetchSleepStages = async () => {
      try {
        const stages = await eegApi.getSleepStages();
        setSleepStages(stages);
      } catch (err) {
        console.error('Failed to fetch sleep stages:', err);
      }
    };
    fetchSleepStages();
  }, []);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile?.name.endsWith('.edf')) {
      setError('Please upload a valid EDF file');
      return;
    }

    setFile(uploadedFile);
    setError('');

    try {
      const info = await eegApi.getFileInfo(uploadedFile);
      setFileInfo(info);
    } catch (err) {
      setError('Failed to read file information');
    }
  };

  const handleDetection = async () => {
    if (!file) {
      setError('Please upload an EDF file first');
      return;
    }

    setLoading(true);
    try {
      const result = await eegApi.classifyFile(file);
      
      // Format probabilities as percentages
      const stageProbs = result.probabilities.map(p => (p * 100).toFixed(1));
      
      setResults({
        currentStage: result.stage_name,
        probabilities: stageProbs,
        stageId: result.stage,
        fileInfo
      });
    } catch (err) {
      setError('Error analyzing sleep data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload({ target: { files: [droppedFile] } });
    }
  };

  const getStageDescription = (stageName) => {
    const stage = sleepStages.find(s => s.name === stageName);
    return stage?.description || '';
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">
            <Typewriter words={["Sleep Stage Detedtor"]} loop cursor cursorStyle="|" />  
          </h1>
          <p className="text-xl text-gray-400">
            Upload your EDF sleep data for advanced sleep stage classification
          </p>
        </div>

        {/* File Info Display */}
        {fileInfo && (
          <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-100 mb-4">File Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-sm">
                <span className="text-gray-400">Channels:</span>
                <p className="text-gray-200">{fileInfo.channels.join(', ')}</p>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Sampling Rate:</span>
                <p className="text-gray-200">{fileInfo.sampling_frequency} Hz</p>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Duration:</span>
                <p className="text-gray-200">{fileInfo.duration_seconds}s</p>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Samples:</span>
                <p className="text-gray-200">{fileInfo.num_samples}</p>
              </div>
            </div>
          </div>
        )}

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
              <FaBed className="w-12 h-12 text-blue-400 mx-auto" />
              <div className="text-lg text-gray-300">
                Drag & drop your EDF file here or click to upload
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
              {error.includes('authorization') && (
                <button
                  onClick={() => navigate('/login')}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  Click here to login
                </button>
              )}
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
                <span>Analyzing Sleep Stages...</span>
              </>
            ) : (
              <>
                <FaChartArea className="w-5 h-5" />
                <span>Analyze Sleep Patterns</span>
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-100 mb-6">
                Sleep Analysis Results
              </h2>
              
              {/* Current Stage */}
              <div className="p-8 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <div className="text-center space-y-4">
                  <h3 className="text-xl text-blue-200">Detected Sleep Stage</h3>
                  <div className="text-6xl">
                    {STAGE_ICONS[results.currentStage]}
                  </div>
                  <div className="text-4xl font-bold text-blue-400">
                    {results.currentStage}
                  </div>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {getStageDescription(results.currentStage)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="w-full p-3 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center space-x-2"
              onClick={() => {
                // Add export functionality here
                console.log('Exporting results...');
              }}
            >
              <FaFileDownload className="w-5 h-5" />
              <span>Export Analysis Report</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SleepStageDetector;