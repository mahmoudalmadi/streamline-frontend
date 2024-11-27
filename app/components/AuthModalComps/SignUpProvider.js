import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext(undefined);

export const useSignUpContext = () => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error("useSignUpContext must be used within SignUpProvider");
    }
    return context;
};

export const SignUpProvider = ({ children }) => {
    const [gaurdianInfo, setGuardianInfo] = useState({ emailAddress: '', phoneNumber: '', fullName:'',dateOfBirth:null});
    const [kids, setKids] = useState([{ id: 1, fullName: "", dateOfBirth: null }]);

    return (
        <SignUpContext.Provider value={{ gaurdianInfo, setGuardianInfo, kids, setKids }}>
            {children}
        </SignUpContext.Provider>
    );
};
