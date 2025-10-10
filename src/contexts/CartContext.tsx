import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductSize } from '@/types/product';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize: ProductSize) => void;
  removeFromCart: (productId: string, sizeLabel: string) => void;
  updateQuantity: (productId: string, sizeLabel: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, selectedSize: ProductSize) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === product.id && item.selectedSize.label === selectedSize.label
      );

      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
        });
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize.label === selectedSize.label
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedSize.label}) added to cart`,
      });
      return [...prev, { product, selectedSize, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string, sizeLabel: string) => {
    setCartItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize.label === sizeLabel)
    ));
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };

  const updateQuantity = (productId: string, sizeLabel: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, sizeLabel);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedSize.label === sizeLabel
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.selectedSize.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
