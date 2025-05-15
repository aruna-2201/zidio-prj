import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, mockRoles } from '../lib/utils';

type AuthContextType = {
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    role?: UserRole;
    avatar?: string;
  } | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  // Simulating checking for existing session
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, we would check localStorage, cookies, or make an API call
      const savedAuth = localStorage.getItem('auth');
      
      if (savedAuth) {
        try {
          const parsedAuth = JSON.parse(savedAuth);
          setIsAuthenticated(true);
          setUser(parsedAuth.user);
        } catch (error) {
          localStorage.removeItem('auth');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would make an API call
    setIsLoading(true);
    
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        if (email && password && mockRoles.includes(role)) {
          const newUser = {
            id: 'user-' + Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email,
            role,
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
          };
          
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('auth', JSON.stringify({ user: newUser }));
          setIsLoading(false);
          resolve(true);
        } else {
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};