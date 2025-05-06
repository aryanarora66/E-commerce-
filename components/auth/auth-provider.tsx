'use client';

import { createContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  status: 'authenticated' | 'unauthenticated' | 'loading';
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  status: 'loading',
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'authenticated' | 'unauthenticated' | 'loading'>('loading');

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setStatus('authenticated');
      } catch (e) {
        localStorage.removeItem('user');
        setStatus('unauthenticated');
      }
    } else {
      setStatus('unauthenticated');
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate authentication
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users
    if (email === 'admin@example.com' && password === 'password') {
      const userData: User = {
        id: 'user_admin',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUser(userData);
      setStatus('authenticated');
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }
    
    if (email === 'seller@example.com' && password === 'password') {
      const userData: User = {
        id: 'user_seller',
        name: 'Seller User',
        email: 'seller@example.com',
        role: 'seller',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUser(userData);
      setStatus('authenticated');
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }
    
    if (email && password.length >= 8) {
      const userData: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0],
        email,
        role: 'customer',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUser(userData);
      setStatus('authenticated');
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }
    
    throw new Error('Invalid credentials');
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate registration
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 8) {
      const userData: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        role: 'customer',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      setUser(userData);
      setStatus('authenticated');
      localStorage.setItem('user', JSON.stringify(userData));
      return;
    }
    
    throw new Error('Invalid registration data');
  };

  const logout = async () => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just clear the local state
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setUser(null);
    setStatus('unauthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}