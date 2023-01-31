import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userFirstname, setUserFirstname] = useState(null);
  const [userLastname, setUserLastname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log(decoded.id, "id decoded de AuthContext");
        setUserId(decoded.id);
        setUserFirstname(decoded.firstname);
        setUserLastname(decoded.lastname);
        setUserEmail(decoded.email);
        setUserRole(decoded.role);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userFirstname, userLastname, userEmail, userRole, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
