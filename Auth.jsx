import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, createuserdocfromAuth } from './utils/firebase';
import { useNavigate } from "react-router-dom";

const Auth = createContext(); // Change this line

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
    console.log('User signed out');
    alert('User signed out');
    home('/');
  };

  return (
    <Auth.Provider value={{ user, signOut }}> {/* Change AuthContext to Auth here */}
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => {
  return useContext(Auth); // Change AuthContext to Auth here
};
