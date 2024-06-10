import * as React from "react";
import { createContext, useCallback, useEffect, useState } from "react";
import { CartItem, ShoppingCart } from "../../models/Cart";


interface AppContextProps {
    theme?: string
    changeTheme?: () => void
    cart?: ShoppingCart
    addCart?: (item: CartItem) => void
    removeCart?: (item: CartItem) => void;
}

const getInitialState = () => {
    if (typeof window !== "undefined") {
        const localData = localStorage.getItem('cart');
        if (localData) {
            return JSON.parse(localData);
        }
    }
    const initialState = {
        items: [],
        totalPrice: 0,
        userId: ''
    };

    return initialState;
}

const AppContext =  createContext<AppContextProps>({})

export function AppProvider({children}) {
    const [theme, setTheme] = useState('')
    const [cart, setCart] = useState(getInitialState)

    function changeTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
       
    }

    const addCart = useCallback((item : CartItem) => {
        setCart(prevCart => [...prevCart, item])
    }, []);

    const removeCart = useCallback((item: CartItem) => {
        setCart(prevCart => prevCart.filter(product => product.product !== item.product))
    }, []);


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        } 
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return (
        <AppContext.Provider value={{
            theme,
            changeTheme,
            cart,
            addCart,
            removeCart
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
