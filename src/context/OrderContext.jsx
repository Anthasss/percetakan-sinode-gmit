import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  const [orderSpecifications, setOrderSpecifications] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const updateOrderSpecifications = (specs) => {
    setOrderSpecifications(specs);
  };

  const resetOrder = () => {
    setQuantity(1);
    setOrderSpecifications({});
    setIsSubmitting(false);
  };

  return (
    <OrderContext.Provider
      value={{
        quantity,
        orderSpecifications,
        isSubmitting,
        setIsSubmitting,
        updateQuantity,
        updateOrderSpecifications,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
