export const API_BASE_URL = 'https://neruosuite-abc6e9efd9hufybr.centralindia-01.azurewebsites.net';

// API helper function with better error handling
const fetchWithError = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      // Handle validation errors
      if (response.status === 422 && data.detail) {
        const errorMessage = data.detail.map(err => err.msg).join('. ');
        throw new Error(errorMessage);
      }
      
      // Handle other API errors
      throw new Error(data.detail || 'An error occurred during the request');
    }
    
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
};

// Auth API endpoints with proper headers and error handling
export const authAPI = {
  login: (credentials) => fetchWithError(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(credentials)
  }),

  signUp: (userData) => fetchWithError(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: userData.email,
      full_name: userData.full_name,
      password: userData.password,
      confirm_password: userData.confirm_password,
      organization: userData.organization || undefined,
      role: userData.role || undefined,
      agreed_to_terms: userData.agreed_to_terms
    })
  }),

  refreshToken: (refreshToken) => fetchWithError(`${API_BASE_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Accept': 'application/json'
    }
  }),

  getUserProfile: (accessToken) => fetchWithError(`${API_BASE_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  })
};

