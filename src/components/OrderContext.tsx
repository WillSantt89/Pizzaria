import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define types for order items
interface OrderItem {
  name: string;
  price: number;
}

// Define the shape of the order state
interface OrderState {
  size?: string;
  flavors: OrderItem[];
  extras: OrderItem[];
  drinks: OrderItem[];
  total: number;
  deliveryFee: number;
  points: number; // Add points to the order state
}

// Define the shape of the context value
interface OrderContextType {
  order: OrderState;
  setSize: (size: string) => void;
  addFlavor: (flavor: OrderItem) => void;
  removeFlavor: (flavor: OrderItem) => void;
  addExtra: (extra: OrderItem) => void;
  removeExtra: (extra: OrderItem) => void;
  addDrink: (drink: OrderItem) => void;
  removeDrink: (drink: OrderItem) => void;
  resetOrder: () => void;
  setDeliveryFee: (fee: number) => void;
  addPoints: (points: number) => void; // Add addPoints function
}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Create a custom hook to consume the context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// Create the provider component
interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, setOrder] = useState<OrderState>({
    flavors: [],
    extras: [],
    drinks: [],
    total: 0,
    deliveryFee: 5, // Example delivery fee
    points: 0, // Initialize points
  });

  const setSize = (size: string) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      size,
    }));
  };

  const addFlavor = (flavor: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      flavors: [...prevOrder.flavors, flavor],
    }));
  };

  const removeFlavor = (flavor: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      flavors: prevOrder.flavors.filter(f => f.name !== flavor.name),
    }));
  };

  const addExtra = (extra: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      extras: [...prevOrder.extras, extra],
    }));
  };

  const removeExtra = (extra: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      extras: prevOrder.extras.filter(e => e.name !== extra.name),
    }));
  };

  const addDrink = (drink: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      drinks: [...prevOrder.drinks, drink],
    }));
  };

  const removeDrink = (drink: OrderItem) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      drinks: prevOrder.drinks.filter(d => d.name !== drink.name),
    }));
  };

  const resetOrder = () => {
    setOrder({
      flavors: [],
      extras: [],
      drinks: [],
      total: 0,
      deliveryFee: 5,
      points: order.points, // Keep existing points
    });
  };

  const setDeliveryFee = (fee: number) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      deliveryFee: fee,
    }));
  };

  const addPoints = (points: number) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      points: prevOrder.points + points,
    }));
  };

  // Calculate total
  const calculateTotal = () => {
    let total = 0;
    if (order.flavors) {
      total += order.flavors.reduce((sum, flavor) => sum + flavor.price, 0);
    }
    if (order.extras) {
      total += order.extras.reduce((sum, extra) => sum + extra.price, 0);
    }
    if (order.drinks) {
      total += order.drinks.reduce((sum, drink) => sum + drink.price, 0);
    }
    return total + order.deliveryFee;
  };

  // Update total whenever flavors, extras, or drinks change
  useEffect(() => {
    setOrder(prevOrder => ({
      ...prevOrder,
      total: calculateTotal(),
    }));
  }, [order.flavors, order.extras, order.drinks, order.deliveryFee]);

  const contextValue: OrderContextType = {
    order: { ...order, total: calculateTotal() },
    setSize,
    addFlavor,
    removeFlavor,
    addExtra,
    removeExtra,
    addDrink,
    removeDrink,
    resetOrder,
    setDeliveryFee,
    addPoints, // Provide addPoints in context
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};
