// AuthContext.tsx
import React, { createContext, useContext } from 'react';
import { authStore } from './AuthStore';

interface AuthContextType {
  authStore: AuthStore;
}

const AuthContext = createContext<AuthContextType>({
  authStore,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={{ authStore }}>
      {children}
    </AuthContext.Provider>
  );
};
