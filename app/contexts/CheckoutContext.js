import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [locationCheckoutAvailability,setLocationCheckoutAvailability]=useState(null)

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData, locationCheckoutAvailability,setLocationCheckoutAvailability }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
