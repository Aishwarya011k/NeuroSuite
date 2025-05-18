import { API_BASE_URL } from './api';

export const eegApi = {
  async classifyFile(file, channelIdx = 0) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('channel_idx', channelIdx);

    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (!tokens?.accessToken) {
      throw new Error('No authorization token found');
    }

    const response = await fetch(`${API_BASE_URL}/eeg/classify-file`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to classify EEG file');
    }

    return response.json();
  },

  async getFileInfo(file) {
    const formData = new FormData();
    formData.append('file', file);

    const tokens = JSON.parse(localStorage.getItem('tokens'));
    
    const response = await fetch(`${API_BASE_URL}/eeg/file-info`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokens?.accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get file information');
    }

    return response.json();
  },

  async getSleepStages() {
    const response = await fetch(`${API_BASE_URL}/eeg/sleep-stages`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch sleep stages info');
    }

    return response.json();
  }
};