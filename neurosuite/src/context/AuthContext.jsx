import React, { createContext, useContext, useState, useEffect } from 'react';
import { refreshToken as refreshTokenApi } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  useEffect(() => {
    // Check and refresh token on mount
    const refreshTokenIfNeeded = async () => {
      if (tokens?.refreshToken) {
        try {
          const newTokens = await refreshTokenApi(tokens.refreshToken);
          setTokens(newTokens);
          localStorage.setItem('tokens', JSON.stringify(newTokens));
        } catch (error) {
          logout();
        }
      }
    };

    refreshTokenIfNeeded();
  }, []);

  const login = (userData, authTokens) => {
    setUser(userData);
    setTokens({
      accessToken: authTokens.accessToken,
      refreshToken: authTokens.refreshToken,
      tokenType: authTokens.tokenType
    });
    localStorage.setItem('tokens', JSON.stringify(authTokens));
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('tokens');
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);