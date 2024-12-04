"use client"; // Mark as client-side

import { AuthProvider } from "./contexts/AuthContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { TeamSignUpProvider } from "./contexts/TeamSignUpProvider";

export default function ClientLayout({ children }) {
      
  return( 
    <TeamSignUpProvider>
    <AuthProvider>
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
    </AuthProvider>
    </TeamSignUpProvider>
  );
}
