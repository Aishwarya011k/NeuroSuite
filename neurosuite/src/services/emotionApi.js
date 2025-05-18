import { API_BASE_URL } from './api';

export const emotionApi = {
  async classifyEmotion(file) {
    const formData = new FormData();
    formData.append('file', file);

    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (!tokens?.accessToken) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/emotion/classify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to classify emotion');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Emotion analysis failed: ${error.message}`);
    }
  },

  async getEmotionInfo() {
    try {
      const response = await fetch(`${API_BASE_URL}/emotion/info`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch emotion information');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Failed to get emotion info: ${error.message}`);
    }
  },

  async getFileMetadata(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/emotion/file-info`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to read file metadata');
      }

      return response.json();
    } catch (error) {
      throw new Error(`File analysis failed: ${error.message}`);
    }
  }
};