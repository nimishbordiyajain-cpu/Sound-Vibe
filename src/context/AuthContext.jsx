import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user to persist login
    const storedUser = localStorage.getItem('soundvibe_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    const mockUser = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      isPremium: false,
    };
    setUser(mockUser);
    localStorage.setItem('soundvibe_user', JSON.stringify(mockUser));
  };

  const register = (name, email, password) => {
    // Mock register logic
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      isPremium: false,
    };
    setUser(mockUser);
    localStorage.setItem('soundvibe_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('soundvibe_user');
  };

  const upgradeToPremium = () => {
    if (user) {
      const upgradedUser = { ...user, isPremium: true };
      setUser(upgradedUser);
      localStorage.setItem('soundvibe_user', JSON.stringify(upgradedUser));
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
