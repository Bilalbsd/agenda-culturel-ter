import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userFirstname, setUserFirstname] = useState(null);
  const [userLastname, setUserLastname] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [nbMaxEvent, setNbMaxEvent] = useState(null);
  const [phone, setPhone] = useState(null);
  const [title, setTitle] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [address, setAddress] = useState(null);
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
        setNbMaxEvent(decoded.nbMaxEvent);
        setPhone(decoded.phone);
        setTitle(decoded.title);
        setCompanyName(decoded.companyName);
        setAddress(decoded.address);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, userFirstname, userLastname, userEmail, userRole, nbMaxEvent, phone, title, companyName, address, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
