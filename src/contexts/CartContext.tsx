import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    updateCartProductQuantity: (productId: string, name: string, price: number, quantity: number) => void;
    getCartQuantity: (productId: string) => number;
    getTotalItems: () => number;
    getTotalAmount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const updateCartProductQuantity = useCallback((productId: string, name: string, price: number, quantity: number) => {
        setCartItems((prevItems) => {
            // If quantity is 0 or negative, remove from cart
            if (quantity <= 0) {
                return prevItems.filter((item) => item.productId !== productId);
            }

            const existingItem = prevItems.find((item) => item.productId === productId);

            // If item doesn't exist and quantity > 0, add to cart
            if (!existingItem) {
                return [...prevItems, { productId, name, price, quantity }];
            }

            // Otherwise, update the quantity
            return prevItems.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            );
        });
    }, []);

    const getCartQuantity = useCallback((productId: string): number => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    }, [cartItems]);

    const getTotalItems = useCallback(() => {
        return cartItems.length;
    }, [cartItems]);

    const getTotalAmount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cartItems]);

    const value: CartContextType = {
        cartItems,
        updateCartProductQuantity,
        getCartQuantity,
        getTotalItems,
        getTotalAmount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

