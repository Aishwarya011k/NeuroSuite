import { authAPI } from './api';

export const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    if (!response.access_token) {
      throw new Error('Invalid response from server');
    }
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      tokenType: response.token_type
    };
  } catch (error) {
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }
};

export const signUp = async (userData) => {
  try {
    const response = await authAPI.signUp(userData);
    if (!response.email) {
      throw new Error('Invalid response from server');
    }
    return response;
  } catch (error) {
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await authAPI.refreshToken(refreshToken);
    if (!response.access_token) {
      throw new Error('Invalid refresh token response');
    }
    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      tokenType: response.token_type
    };
  } catch (error) {
    throw new Error('Session expired. Please login again.');
  }
};

export const getUserProfile = async (accessToken) => {
  try {
    return await authAPI.getUserProfile(accessToken);
  } catch (error) {
    throw new Error('Failed to fetch user profile.');
  }
};