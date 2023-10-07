import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, createuserdocfromAuth } from './utils/firebase';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const home = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userDocRef = await createuserdocfromAuth(authUser);
        setUser({ uid: authUser.uid, email: authUser.email, userDocRef });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    console.log('User signed out successfully');
    alert('User signed out successfully');
    home('/');
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
