import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and validate token
    const initAuth = async () => {
      const storedUser = localStorage.getItem('civicPulseUser');
      const token = localStorage.getItem('civicPulseToken');

      if (storedUser && token) {
        try {
          // Validate token by fetching current user from backend
          const response = await authAPI.getMe();
          if (response.success) {
            setUser(response.data.user);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('civicPulseUser');
            localStorage.removeItem('civicPulseToken');
          }
        } catch (error) {
          // Token expired or invalid
          localStorage.removeItem('civicPulseUser');
          localStorage.removeItem('civicPulseToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });

      if (response.success) {
        const { user: userData, token } = response.data;
        setUser(userData);
        localStorage.setItem('civicPulseUser', JSON.stringify(userData));
        localStorage.setItem('civicPulseToken', token);
        return { success: true };
      }

      return { success: false, error: response.message || 'Login failed' };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });

      if (response.success) {
        const { user: userData, token } = response.data;
        setUser(userData);
        localStorage.setItem('civicPulseUser', JSON.stringify(userData));
        localStorage.setItem('civicPulseToken', token);
        return { success: true };
      }

      return { success: false, error: response.message || 'Registration failed' };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicPulseUser');
    localStorage.removeItem('civicPulseToken');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

