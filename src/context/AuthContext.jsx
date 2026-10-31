import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// 必须带有 export 关键字
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const register = async (username, email, password) => {
    const { data } = await api.post('/users/register', { username, email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};