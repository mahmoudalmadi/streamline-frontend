"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { monitorAuthState } from '../hooks/authHooks/firebaseAuth'; // Ensure this is correctly imported
import { getUserByFirebaseId, getDependantsByFirebaseId } from '../hooks/firestoreHooks/user/getUser';
import { getEntriesByMatching } from '../hooks/firestoreHooks/retrieving/getEntriesByMatching';

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
        
        if (userData.accountType=="team"){
          const teamInfo = await getEntriesByMatching({collectionName:"Team",fields:{firebaseId:currentUser.uid}})
          console.log("TEAM INFo",teamInfo)
          setUserInfo((prevInfo) => ({
            ...prevInfo, // Retain existing keys in the state object
            teamInfo: teamInfo[0],
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
