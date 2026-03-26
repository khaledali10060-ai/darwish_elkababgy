import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  name: string;
  price: number;
  weight?: string;
  quantity: number;
};

type CartContextType = {
  cart: Record<string, CartItem>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, CartItem>>(() => {
    const savedCart = localStorage.getItem('darwish-cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('darwish-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const cartKey = item.weight ? `${item.name}-${item.weight}` : item.name;
    setCart((prev) => {
      const existing = prev[cartKey];
      if (existing) {
        return {
          ...prev,
          [cartKey]: { ...existing, quantity: (existing.quantity || 0) + item.quantity },
        };
      }
      return { ...prev, [cartKey]: item };
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[cartKey];
      return newCart;
    });
  };

  const updateQuantity = (cartKey: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[cartKey];
      if (!existing) return prev;
      const newQty = (existing.quantity || 0) + delta;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[cartKey];
        return newCart;
      }
      return {
        ...prev,
        [cartKey]: { ...existing, quantity: newQty },
      };
    });
  };

  const clearCart = () => setCart({});

  const totalItems = (Object.values(cart) as CartItem[]).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = (Object.values(cart) as CartItem[]).reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
