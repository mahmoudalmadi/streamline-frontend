import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
