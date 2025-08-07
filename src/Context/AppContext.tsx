import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate async auth check
    const timer = setTimeout(() => {
      const fakeUser = { email: 'creator@example.com' };
      console.log('✅ AuthContext: setting user', fakeUser);
      setUser(fakeUser);
    }, 500); // Delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
