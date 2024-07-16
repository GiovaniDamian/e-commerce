import * as React from "react";
import { createContext, useCallback, useEffect, useState, ReactNode } from "react";
import { CartItem, ShoppingCart } from "../../models/Cart";
import Cookies from 'js-cookie';
import useAuth from "../hook/useAuth";

interface AppContextProps {
    theme?: string
    changeTheme?: () => void
    cart?: ShoppingCart
    resetCart?: () => void
    addCart?: (item: CartItem) => void
    removeCart?: (item: CartItem) => void
    updateCartQuantity?: (productName: string, quantity: number) => void
}

const AppContext = createContext<AppContextProps>({})

const getInitialCart = () => {
    const savedCart = Cookies.get('cart')
    if (savedCart) {
        try {
            return JSON.parse(savedCart)
        } catch (error) {
            console.error("Failed to parse cart from cookies", error)
        }
    }
    return { items: [], totalPrice: 0 }
};
interface AppProviderProps {
    children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
    const [theme, setTheme] = useState<string>('');
    const [cart, setCart] = useState<ShoppingCart>(getInitialCart);
    const { usuario } = useAuth()
    function changeTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }
    function resetCart() {
        setCart({ items: [], totalPrice: 0 })
    }

    function addCart (item: CartItem) {
        setCart(prevCart => {
            const existingItem = prevCart.items.find(cartItem => cartItem.product.name === item.product.name && cartItem.product.options === item.product.options);

            let updatedItems
            if (existingItem) {
                updatedItems = prevCart.items.map(cartItem =>
                    cartItem.product.name === item.product.name
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                updatedItems = [...prevCart.items, item]
            }

            const updatedTotalPrice = updatedItems.reduce((total, cartItem) => {
                return total + cartItem.product.price * cartItem.quantity
            }, 0);

            return { items: updatedItems, totalPrice: updatedTotalPrice }
        });
    }

    function removeCart (item: CartItem) {
        setCart(prevCart => {
            const updatedItems = prevCart.items.filter(cartItem => cartItem.product.name !== item.product.name)
            const updatedTotalPrice = updatedItems.reduce((total, cartItem) => {
                return total + cartItem.product.price * cartItem.quantity
            }, 0)

            return { items: updatedItems, totalPrice: updatedTotalPrice }
        })
    }

    function updateCartQuantity (productName: string, quantity: number) {
        setCart(prevCart => {
            const updatedItems = prevCart.items.map(cartItem =>
                cartItem.product.name === productName
                    ? { ...cartItem, quantity }
                    : cartItem
            ).filter(cartItem => cartItem.quantity > 0)

            const updatedTotalPrice = updatedItems.reduce((total, cartItem) => {
                return total + cartItem.product.price * cartItem.quantity;
            }, 0)

            return { items: updatedItems, totalPrice: updatedTotalPrice }
        })
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(cart), {
            expires: 7
        });
    }, [cart]);

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme,
            cart,
            resetCart,
            addCart,
            removeCart,
            updateCartQuantity
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;
