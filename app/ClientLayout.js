"use client"; // Mark as client-side

import { CheckoutProvider } from "./contexts/CheckoutContext";

export default function ClientLayout({ children }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
