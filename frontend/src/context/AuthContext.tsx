import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
      const { token, role } = response.data;
      setToken(token);
      setRole(role);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const signup = async (username: string, password: string, fullName: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', { username, password, fullName });
      const { token, role } = response.data;
      setToken(token);
      setRole(role);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    } catch (error) {
      console.error('Signup failed', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, role, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};