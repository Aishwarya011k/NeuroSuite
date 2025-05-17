import React, { useState } from 'react';
import { FaCloudUploadAlt, FaBrain, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from './LoadSpinner';
import { Typewriter } from 'react-simple-typewriter';

const EEGDecoder = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    const validTypes = ['.csv', '.txt', '.edf'];
    const fileExtension = '.' + uploadedFile.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(fileExtension)) {
      setError('Invalid file format. Please upload .csv, .txt, or .edf files.');
      return;
    }

    setFile(uploadedFile);
    setError('');
  };

  const handleDecode = async () => {
    if (!file) {
      setError('Please select an EEG file before decoding.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // API call simulation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        // Simulated result
        imageUrl: '/sample-result.png',
        insights: 'Sample brain activity analysis...'
      });
    } catch (err) {
      setError('Something went wrong while decoding. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-400">
           <Typewriter words={["Decode Your Mind in a Click"]} loop cursor cursorStyle="|" /> 
          </h1>
          <p className="text-xl text-gray-400">
            Ever wondered what your brain is really thinking? Upload your EEG data and 
            instantly visualize your brain's decoded activity — all powered by AI.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileUpload({ target: { files: e.dataTransfer.files } });
            }}
          >
            <input
              type="file"
              id="eeg-file"
              className="hidden"
              accept=".csv,.txt,.edf"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="eeg-file"
              className="cursor-pointer space-y-4 block"
            >
              <FaCloudUploadAlt className="w-12 h-12 text-blue-400 mx-auto" />
              <div className="text-lg text-gray-300">
                Drag & drop your EEG file here or click to upload
              </div>
              <div className="text-sm text-gray-500">
                Accepted formats: .csv, .txt, .edf
              </div>
            </label>
            {file && (
              <div className="mt-4 text-green-400">
                Selected file: {file.name}
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 text-red-400 text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleDecode}
            disabled={isProcessing || !file}
            className={`w-full mt-6 p-3 rounded-lg flex items-center justify-center space-x-2
              ${isProcessing || !file 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner />
                <span>Decoding your thoughts...</span>
              </>
            ) : (
              <>
                <FaBrain className="w-5 h-5" />
                <span>Decode My Brain</span>
              </>
            )}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold text-blue-100 mb-4">
              Here's What Your Brain is Telling Us
            </h2>
            <p className="text-gray-400 mb-6">
              The image below is generated based on your brainwave patterns. 
              This visual reflects your neural activity — a glimpse into your 
              subconscious thoughts.
            </p>
            <img
              src={result.imageUrl}
              alt="AI-generated image from EEG brainwave data"
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* Info Sidebar */}
        <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-800/50">
          <div className="flex items-start space-x-3">
            <FaInfoCircle className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-100">
                What is EEG?
              </h3>
              <p className="text-gray-400 mt-2">
                EEG (Electroencephalography) records electrical activity in your brain. 
                By analyzing these signals, we can generate unique visual insights 
                about your mental state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEGDecoder;