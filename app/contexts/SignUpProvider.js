import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext();

export const useSignUpContext = () => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error("useSignUpContext must be used within SignUpProvider");
    }
    return context;
};

export const SignUpProvider = ({ children }) => {
    const [guardianInfo, setGuardianInfo] = useState({ emailAddress: '', phoneNumber: '', fullName:'',dateOfBirth:null,isGuardian:null});
    const [kids, setKids] = useState([{ id: 1, fullName: "", dateOfBirth: null }]);
    const [hasNumber, setHasNumber] = useState(false)
    const [hasEmail, setHasEmail] = useState(false)

    return (
        <SignUpContext.Provider value={{ guardianInfo, setGuardianInfo, kids, setKids, hasNumber,setHasNumber,hasEmail,setHasEmail }}>
            {children}
        </SignUpContext.Provider>
    );
};
