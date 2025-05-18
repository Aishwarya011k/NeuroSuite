import React, { useState, useEffect } from 'react';
import { FaBed, FaChartArea, FaFileDownload, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from './LoadSpinner';
import { eegApi } from '../services/eegApi';
import { Typewriter } from 'react-simple-typewriter';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SleepStageDetector = () => {
  const { user, tokens } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !tokens?.accessToken) {
      navigate('/login');
    }
  }, [user, tokens, navigate]);

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
    try {
      const uploadedFile = event.target.files[0];
      if (!uploadedFile) {
        setError('No file selected');
        return;
      }

      if (!uploadedFile.name.toLowerCase().endsWith('.edf')) {
        setError('Please upload a valid EDF file');
        return;
      }

      // Check file size (e.g., max 100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (uploadedFile.size > maxSize) {
        setError('File size too large. Maximum size is 100MB');
        return;
      }

      setFile(uploadedFile);
      setError('');
      setLoading(true);

      try {
        const info = await eegApi.getFileInfo(uploadedFile);
        setFileInfo(info);
      } catch (err) {
        setError(err.message || 'Failed to read file information');
        setFile(null);
      } finally {
        setLoading(false);
      }
    } catch (err) {
      setError('Error processing file: ' + err.message);
      setFile(null);
      setLoading(false);
    }
  };

  // Update the file drop handler
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload({ target: { files: [droppedFile] } });
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
              <div className="mb-8 p-6 bg-blue-900/20 rounded-lg border border-blue-800/50">
                <div className="text-center">
                  <h3 className="text-xl text-blue-200 mb-2">Current Sleep Stage</h3>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {results.currentStage}
                  </div>
                  <p className="text-gray-400">
                    {getStageDescription(results.currentStage)}
                  </p>
                </div>
              </div>

              {/* Stage Probabilities */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {sleepStages.map((stage, index) => (
                  <div 
                    key={stage.id}
                    className={`text-center p-4 rounded-lg ${
                      results.stageId === stage.id 
                        ? 'bg-blue-600/20 border border-blue-500/50' 
                        : 'bg-gray-700/50'
                    }`}
                  >
                    <div className="text-sm text-gray-400">{stage.name}</div>
                    <div className="text-xl font-bold text-blue-300">
                      {results.probabilities[index]}%
                    </div>
                  </div>
                ))}
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