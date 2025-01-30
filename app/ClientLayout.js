"use client"; // Mark as client-side

import { AuthProvider } from "./contexts/AuthContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { SignUpProvider } from "./contexts/SignUpProvider";
import { TeamSignUpProvider } from "./contexts/TeamSignUpProvider";

export default function ClientLayout({ children }) {
      
  return( 
    <TeamSignUpProvider>
    <AuthProvider>
    <CheckoutProvider>
    <SignUpProvider>
      {children}
    </SignUpProvider>
    </CheckoutProvider>
    </AuthProvider>
    </TeamSignUpProvider>
  );
}
