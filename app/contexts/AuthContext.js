"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { monitorAuthState } from '../hooks/authHooks/firebaseAuth'; // Ensure this is correctly imported
import { getUserByFirebaseId, getDependantsByFirebaseId } from '../hooks/firestoreHooks/user/getUser';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({"userData":null, "otherSwimmers":null});
 
  useEffect(() => {
    const unsubscribe = monitorAuthState(async(currentUser) => {
      setUser(currentUser || null);

      if (currentUser){
      const userData = await getUserByFirebaseId({firebaseId:currentUser.uid})
      const otherSwimmers = await getDependantsByFirebaseId({firebaseId:currentUser.uid})

        console.log("OTHER SWIMS", otherSwimmers)
        if(otherSwimmers){
        setUserInfo((prevInfo) => ({
        ...prevInfo, // Retain existing keys in the state object
        userData: userData,
        otherSwimmers: otherSwimmers,
        }))
        } else{
          setUserInfo((prevInfo) => ({
            ...prevInfo, // Retain existing keys in the state object
            userData: userData,
            }))
        }
    }
      
    });


    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
